import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import API from "../../../../api";
import SpinnerLoading from "../../common/spinnerLoading";
import Qualities from "../../ui/qualities";
import Rate from "../../common/rate";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(id).then((data) => setUser(data));
    }, []);

    const handlerClickBtn = () => {
        history.push(`/users/${id}/edit`);
    };
    const handlerClickBtnAllUser = () => {
        history.goBack();
    };

    return user ? (
        <>
            <div className=" card text-center">
                <span className="h1 card-header">{user.name}</span>
                <span className="h2 d-block">
                    {`Профессия: ${user.profession.name.toUpperCase()}`}{" "}
                </span>
                <Qualities qualities={user.qualities} />
                <span className="h4 d-block">
                    Количество встреч: {user.completedMeetings}
                </span>
                <span className="h4">Реитинг: {<Rate rate={user.rate} />}</span>
                <div className=" py-3 card-footer">
                    <button
                        onClick={handlerClickBtnAllUser}
                        className="btn btn-primary me-4"
                    >
                        Все пользователи
                    </button>
                    <button
                        onClick={handlerClickBtn}
                        className="btn btn-primary"
                    >
                        Изменить
                    </button>
                </div>
            </div>
        </>
    ) : (
        <SpinnerLoading />
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
