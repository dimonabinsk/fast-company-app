import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import API from "../../api";
import SpinnerLoading from "./spinnerLoading";
import CharacteristicList from "./characteristicList";
import Rate from "./rate";

const UserSingle = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(id).then((data) => setUser(data));
    }, []);

    const handlerClickBtn = () => {
        history.push("/users");
    };

    // console.log(user);
    return user ? (
        <>
            <div className=" card text-center">
                <span className="h1 card-header">{user.name}</span>
                <span className="h2 d-block">
                    {`Профессия: ${user.profession.name.toUpperCase()}`}{" "}
                </span>
                <CharacteristicList qualities={user.qualities} />
                <span className="h4 d-block">
                    Количество встреч: {user.completedMeetings}
                </span>
                <span className="h4">Реитинг: {<Rate rate={user.rate} />}</span>
                <div className=" py-3 card-footer">
                    <button
                        onClick={handlerClickBtn}
                        className="btn btn-primary"
                    >
                        Все пользователи
                    </button>
                </div>
            </div>
        </>
    ) : (
        <SpinnerLoading />
    );
};

UserSingle.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserSingle;
