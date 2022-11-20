import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash";

import API from "../../../../api";
// import { validator } from "../../../utility/validator";
import AddCommentForm from "../../page/userPage/addCommentForm";
import CommentsList from "../../page/userPage/commentsList";

const Comments = ({ userId }) => {
    const [isComments, setComments] = useState([]);
    // const [users, setUsers] = useState([]);
    // const [data, setData] = useState({
    //     name: "",
    //     textarea: ""
    // });
    // const [errors, setErrors] = useState({});
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleAddComment = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...isComments, data]));
    };

    const handleDeleteComment = (commentId) => {
        API.comments.remove(commentId).then((data) => {
            setComments((prev) => {
                return prev.filter(({ _id }) => _id !== data);
            });
        });
    };
    // const handleRemoveComment = (id) => {
    //     api.comments.remove(id).then((id) => {
    //         setComments(comments.filter((x) => x._id !== id));
    //     });
    // };

    // useEffect(() => {
    //     API.users.fetchAll().then((data) => {
    //         const usersList = data.map(({ _id, name }) => ({
    //             label: name,
    //             value: _id
    //         }));
    //         // const filterUser = usersList
    //         setUsers(usersList);
    //     });
    //     // console.log(users);
    // }, []);

    // const handleChangeForm = (target) => {
    //     // console.log(target);
    //     setData((prevState) => ({
    //         ...prevState,
    //         [target.name]: target.value
    //     }));
    // };

    // useEffect(() => {
    //     const userObj = users.filter(({ value }) => value === data.name);
    //     setUserComment(userObj);
    //     // console.log(data);
    //     // console.log(users);
    // }, [data.name]);
    // console.log(isUserComment);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     const { name, textarea } = data;
    //     // console.log(data);
    //     const updateData = {
    //         pageId: id,
    //         userId: name,
    //         content: textarea
    //     };
    //     API.comments.add(updateData).then((data) => {
    //         console.log(data);
    //     });
    // };

    // const validatorConfig = {
    //     name: {
    //         isRequired: {
    //             message: "Имя обязательно для заполнения"
    //         }
    //     },
    //     textarea: {
    //         isRequired: {
    //             message: "Поле обязательно для заполнения"
    //         }
    //     }
    // };

    // const isValid = Object.keys(errors).length === 0;

    // const validate = () => {
    //     const errors = validator(data, validatorConfig);
    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };

    // useEffect(() => {
    //     validate();
    // }, [data]);

    const sortedComments = orderBy(isComments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onAddComment={handleAddComment} />
                </div>
                {sortedComments.length > 0 && (
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Комментарии</h2>
                            <hr />
                            <CommentsList
                                onDeleteComment={handleDeleteComment}
                                isComments={sortedComments}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
