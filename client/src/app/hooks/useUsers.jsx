import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import SpinnerLoading from "../components/common/spinnerLoading";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (e) {
            errorCather(e);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users];
            const indexUser = newUsers.findIndex(
                (u) => u._id === currentUser._id
            );
            newUsers[indexUser] = currentUser;
            setUsers(newUsers);
        }
    }, [currentUser]);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }

    function getUserById(userId) {
        return users.find((user) => user._id === userId);
    }

    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : <SpinnerLoading />}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
