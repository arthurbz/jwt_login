import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = event => {
        setInputs({
            ...inputs, [event.target.name]
                : event.target.value
        });
    };

    const onSubmitForm = async event => {
        event.preventDefault();

        try {
            const body = { email, password }

            const response = await fetch("http://localhost:5000/auth/login",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                });

            const parseResponse = await response.json();

            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
                toast.success("Logged in successfully!");
            } else {
                setAuth(false);
                toast.error("Email or password is invalid!");
            }



        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    className="form-control my-3"
                    onChange={event => onChange(event)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    className="form-control my-3"
                    onChange={event => onChange(event)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/register">Don't have an account yet?</Link>
        </Fragment>
    );
}

export default Login;