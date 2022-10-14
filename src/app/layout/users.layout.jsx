import React from "react";
import { useParams } from "react-router-dom";
import User from "../components/user";
import Users from "../components/users";

const UsersLayout = () => {
    const { userId } = useParams();
    return userId ? <User id={userId} /> : <Users />;
};

export default UsersLayout;
