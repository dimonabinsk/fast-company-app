import React, { useState, useEffect } from "react";
import API from "../../api";
import PropTypes from "prop-types";
import SpinnerLoading from "./spinnerLoading";
import CharacteristicList from "./characteristicList";
import Rate from "./rate";
import { Link } from "react-router-dom";

const User = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(id).then((data) => setUser(data));
    }, []);

    // console.log(user);
    return user ? (
        <>
            <span className="h1">{user.name}</span>
            <span className="h2 d-block">
                {`Профессия: ${user.profession.name}`}{" "}
            </span>
            <CharacteristicList qualities={user.qualities} />
            <span className="h4 d-block">
                Количество встреч: {user.completedMeetings}
            </span>
            <span className="h4">Реитинг: {<Rate rate={user.rate} />}</span>
            <div className=" mt-2">
                <Link to="/users" role="button" className=" btn btn-primary">
                    Все пользователи
                </Link>
            </div>
        </>
    ) : (
        <SpinnerLoading />
    );
};

User.propTypes = {
    id: PropTypes.string
};

export default User;
