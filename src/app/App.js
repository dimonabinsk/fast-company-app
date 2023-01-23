import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";

// import QualitiesProvider from "./hooks/useQualities";
// import ProfessionProvider from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div className="container-fluid p-3">
            <AppLoader>
                <AuthProvider>
                    <NavBar />
                    {/* <QualitiesProvider> */}
                    {/* <ProfessionProvider> */}
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Redirect to="/" />
                    </Switch>
                    {/* </ProfessionProvider> */}
                    {/* </QualitiesProvider> */}
                </AuthProvider>
            </AppLoader>

            <ToastContainer />
        </div>
    );
}

export default App;
