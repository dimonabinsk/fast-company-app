import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../components/common/spinnerLoading";
// import { useAuth } from "../hooks/useAuth";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();
    // const { logOut } = useAuth();
    useEffect(() => {
        dispatch(logOut());
        // logOut();
    }, []);
    return <SpinnerLoading />;
};

export default LogOut;
