import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Rate from "../../common/rate";
// import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import { getProfessionsByIds } from "../../../store/professions";

const UserInfoCard = ({ userId, user }) => {
    // const { currentUser } = useAuth();
    const currentUserId = useSelector(getCurrentUserId());
    const profession = useSelector(getProfessionsByIds(user.profession));

    const history = useHistory();
    const handleUserEdit = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUserId === user._id && (
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
                        <p className="text-secondary mb-1">{profession.name}</p>
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
    user: PropTypes.object,
    userId: PropTypes.string.isRequired
};

export default UserInfoCard;
