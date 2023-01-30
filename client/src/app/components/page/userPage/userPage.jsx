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
// import { useUser } from "../../../hooks/useUsers";
// import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const history = useHistory();
    // const { getUserById } = useUser();
    const user = useSelector(getUserById(userId));
    const handlerClickBtnAllUser = () => {
        history.push("/users");
    };

    return user ? (
        <>
            <div className="container mt-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfoCard user={user} userId={userId} />
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Качества</span>
                                </h5>
                                <p className="card-text">
                                    <QualitiesCard qualities={user.qualities} />
                                </p>
                            </div>
                        </div>

                        <CompletedMeetingsCard
                            meetings={user.completedMeetings}
                        />

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
                        {/* <CommentsProvider> */}
                            <Comments userId={userId} />
                        {/* </CommentsProvider> */}
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
