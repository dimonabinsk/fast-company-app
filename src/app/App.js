import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionList } from "./store/professions";
import { loadUsersList } from "./store/users";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProfessionList());
        dispatch(loadQualitiesList());
        dispatch(loadUsersList());
    }, []);

    return (
        <div className="container-fluid p-3">
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
            <ToastContainer />
        </div>
    );
}

export default App;
