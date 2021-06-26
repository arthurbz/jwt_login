import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = inputs;

    const onChange = event => {
        setInputs({
            ...inputs, [event.target.name]
                : event.target.value
        });
    };

    const onSubmitForm = async event => {
        event.preventDefault();

        try {
            const body = { name, email, password }

            const response = await fetch("http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                });

            const parseResponse = await response.json();

            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
                toast.success("Registered successfully!");
            } else {
                setAuth(false);
                toast.error(parseResponse);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    className="form-control my-3"
                    value={name}
                    onChange={event => onChange(event)}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control my-3"
                    value={email}
                    onChange={event => onChange(event)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control my-3"
                    value={password}
                    onChange={event => onChange(event)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Already have an account?</Link>
        </Fragment>
    );
}

export default Register;