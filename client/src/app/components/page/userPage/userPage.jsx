import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import SpinnerLoading from "../../common/spinnerLoading";
import {
    UserInfoCard,
    QualitiesCard,
    CompletedMeetingsCard,
    Comments
} from "../../ui";

import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const user = useSelector(getUserById(userId));
    const handlerClickBtnAllUser = () => {
        history.push("/users");
    };

    return user ? (
        <>
            <div className="container mt-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <CompletedMeetingsCard value={user.completedMeetings} />
                        <div className=" d-flex flex-column">
                            <button
                                onClick={handlerClickBtnAllUser}
                                className="btn btn-primary"
                            >
                                Все встречи
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        </>
    ) : (
        <SpinnerLoading />
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
