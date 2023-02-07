import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionList } from "../../../store/professions";
import {
    getIsLoggedIn,
    getUsersLoadStatus,
    loadUsersList
} from "../../../store/users";
import SpinnerLoading from "../../common/spinnerLoading";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userLoadStatus = useSelector(getUsersLoadStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    return userLoadStatus ? <SpinnerLoading /> : children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
