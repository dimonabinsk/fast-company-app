import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Redirect to="/" />
                </Switch>
            </ProfessionProvider>

            <ToastContainer />
        </>
    );
}

export default App;
