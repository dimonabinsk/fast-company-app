import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";

import EditUserPage from "../components/page/EditUserPage";
import { UserPage } from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

// import UserProvider from "../hooks/useUsers";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const { userId, edit } = useParams();

    const currentUserID = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                    {userId ? (
                        edit ? (
                            userId === currentUserID ? (
                                <EditUserPage />
                            ) : (
                                <Redirect to={`/users/${currentUserID}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
