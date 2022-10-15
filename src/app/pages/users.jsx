import React from "react";
import { useParams } from "react-router-dom";
import UserSingle from "../components/userSingle";
import UsersMain from "../components/usersMain";

const UsersLayout = () => {
    const { userId } = useParams();
    return userId ? <UserSingle id={userId} /> : <UsersMain />;
};

export default UsersLayout;