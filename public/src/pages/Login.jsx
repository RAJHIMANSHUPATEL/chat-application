import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
    username: "",
    confirmPassword: "",
    });
    //Setting up toast options
    const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    };
    // Redirecting to "/" if the user is already logged in
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);

    //Setting up submit
    const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
        const { password, username } = values;
        const { data } = await axios.post(loginRoute, {
        username,
        password,
        });
        if (data.status === false) {
        toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            navigate("/");
        }
        
    }
    };
    const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
        toast.error(
        "Email and password is required",
        toastOptions
        );
        return false;
    } else if (username === "") {
        toast.error("Email and pasword is required", toastOptions);
        return false;
    }
    return true;
    };

    return (
    <>
        <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="brand">
            <img src={logo} alt="" />
            <h1>snappy</h1>
            </div>
            <input
            type="text"
            placeholder="Username"
            name="username"
                        onChange={(e) => handleChange(e)}
                        min={3}
            />
            <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            />
            <button type="Submit">Login</button>
            <span>
            Don't have an account? <Link to="/register">Register</Link>
            </span>
        </form>
        </FormContainer>
        <ToastContainer />
    </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
        background-color: #4e0eff;
        }
    }
    span {
        color: white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
        }
    }
`;

export default Login;
