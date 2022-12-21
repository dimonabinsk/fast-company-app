import React, { useEffect } from "react";
import SpinnerLoading from "../components/common/spinnerLoading";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <SpinnerLoading />;
};

export default LogOut;
