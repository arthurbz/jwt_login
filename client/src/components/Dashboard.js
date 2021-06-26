import React, { Fragment, useState, useEffect } from "react";

import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        getName();
    }, []);

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

            const parseResponse = await response.json();

            setName(parseResponse.name);
        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = event => {
        event.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.info("Logged out successfuly!");
    }

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <h2>Hello, {name}</h2>
            <button
                className="btn btn-primary"
                onClick={event => logout(event)}
            >Logout</button>
        </Fragment>
    );
}

export default Dashboard;