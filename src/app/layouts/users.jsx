import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/EditUserPage";
import { UserPage } from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";
import { getDataStatus, loadUsersList } from "../store/users";

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList());
        }
    }, []);
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
