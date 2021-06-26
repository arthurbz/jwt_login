import React, { Fragment, useEffect, useState } from "react";
import './App.css';

import { BrowserRouter, Switch, Route, Redirect, Router } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    async function isAuth() {
        try {

            const response = await fetch("http://localhost:5000/auth/verify",
                {
                    method: "GET",
                    headers: { token: localStorage.token }
                });

            const parseResponse = await response.json();

            parseResponse === true
                ? setIsAuthenticated(true)
                : setIsAuthenticated(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        isAuth();
    });

    return <Fragment>
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route exact path="/login" render=
                        {
                            props => !isAuthenticated ? <Login {...props} setAuth={setAuth} />
                                : <Redirect to="/dashboard"></Redirect>
                        }
                    ></Route>

                    <Route exact path="/register" render=
                        {
                            props => !isAuthenticated ? < Register {...props} setAuth={setAuth} />
                                : <Redirect to="/login"></Redirect>
                        }
                    ></Route>

                    <Route exact path="/dashboard" render=
                        {
                            props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth} />
                                : <Redirect to="/login"></Redirect>
                        }
                    ></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Fragment >
}

export default App;