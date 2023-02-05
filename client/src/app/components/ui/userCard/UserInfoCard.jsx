import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Rate from "../../common/rate";

import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";

const UserInfoCard = ({ user }) => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());

    const handleUserEdit = () => {
        history.push(`${history.location.pathname}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleUserEdit}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="125"
                        height="125"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <Rate rate={user.rate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserInfoCard.propTypes = {
    user: PropTypes.object
};

export default UserInfoCard;
