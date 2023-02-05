import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../components/common/spinnerLoading";

import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <SpinnerLoading />;
};

export default LogOut;
