import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUserDataBookmark } from "../../store/users";

const Bookmark = ({ userBookmarkId }) => {
    const currentUser = useSelector(getCurrentUserData());
    const [isStatus, setStatus] = useState(false);
    const dispatch = useDispatch();

    const handlerToggleBookMark = (userBookmarkId, user) => {
        getStatusBookmark(userBookmarkId, user);
    };

    function getStatusBookmark(idBookmark, user) {
        if (user) {
            const userBookmark = [...user.bookmark];
            if (userBookmark.length > 0) {
                const status = userBookmark.findIndex(
                    (id) => id === idBookmark
                );

                if (status !== -1) {
                    const newBookmark = userBookmark.filter(
                        (id) => id !== idBookmark
                    );
                    dispatch(
                        updateUserDataBookmark({
                            ...user,
                            bookmark: newBookmark
                        })
                    );
                    setStatus(false);
                } else {
                    userBookmark.push(idBookmark);
                    dispatch(
                        updateUserDataBookmark({
                            ...user,
                            bookmark: userBookmark
                        })
                    );
                    setStatus(true);
                }
            } else {
                userBookmark.push(idBookmark);
                dispatch(
                    updateUserDataBookmark({
                        ...user,
                        bookmark: userBookmark
                    })
                );
                setStatus(true);
            }
        }
    }

    useEffect(() => {
        if (currentUser) {
            const userBookmark = [...currentUser.bookmark];
            if (userBookmark.length > 0) {
                userBookmark.forEach((elem) => {
                    if (elem === userBookmarkId) {
                        setStatus(true);
                    }
                });
            } else {
                setStatus(false);
            }
        }
    }, []);

    return (
        <>
            <button
                className="btn btn-sm"
                onClick={() =>
                    handlerToggleBookMark(userBookmarkId, currentUser)
                }
            >
                <i
                    className={`bi bi-heart${
                        isStatus ? "-fill text-warning" : ""
                    } fs-2 `}
                ></i>
            </button>
        </>
    );
};

Bookmark.propTypes = {
    userBookmarkId: PropTypes.string
};

export default Bookmark;
