import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";
import Main from "./pages/main";
import Login from "./pages/login";
import Users from "./pages/users";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
