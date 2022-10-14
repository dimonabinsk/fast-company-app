import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import Header from "./components/header";
import { Route, Switch } from "react-router-dom";
import Main from "./layout/main";
import Login from "./layout/login";
import UsersLayout from "./layout/users.layout";

function App() {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersLayout} />
            </Switch>
        </>
    );
}

export default App;
