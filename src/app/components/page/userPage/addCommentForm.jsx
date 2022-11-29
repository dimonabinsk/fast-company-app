import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import API from "../../../../api";
import { validator } from "../../../utility/validator";
import { SelectField, TextareaField } from "../../common/form";
import SpinnerLoading from "../../common/spinnerLoading";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onAddComment }) => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(data);
        });
        // console.log(users);
    }, []);

    const handleChangeForm = (target) => {
        // console.log(target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const resetForm = () => {
        setData(initialData);
        setErrors({});
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберете имя отправителя"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение обязательно для заполнения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onAddComment(data);
        resetForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        if (data.userId !== "" || data.content !== "") {
            validate();
        }
    }, [data]);
    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <form action="" onSubmit={handleSubmit}>
                        <h2>Новый комментарий</h2>
                        <div className="mb-4">
                            {users.length > 0 ? (
                                <SelectField
                                    label={"Пользователь"}
                                    value={data.userId}
                                    onChange={handleChangeForm}
                                    options={arrayOfUsers}
                                    name={"userId"}
                                    id={"name"}
                                    defaultOption="Выберите пользователя"
                                    error={errors.userId}
                                />
                            ) : (
                                <SpinnerLoading />
                            )}
                        </div>
                        <div className="mb-4">
                            <TextareaField
                                value={data.content}
                                name={"content"}
                                placeholder="Введите комментарий"
                                onChange={handleChangeForm}
                                label="Сообщение"
                                height={"100"}
                                error={errors.content}
                            />
                        </div>
                        <div className="mb-4 d-flex flex-column">
                            <button
                                className="btn btn-primary"
                                disabled={
                                    data.userId === "" ||
                                    data.content === "" ||
                                    !isValid
                                }
                            >
                                Оставить комментарий
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

AddCommentForm.propTypes = {
    users: PropTypes.array,
    errors: PropTypes.object,
    data: PropTypes.object,
    onAddComment: PropTypes.func,
    onChangeForm: PropTypes.func,
    isValid: PropTypes.bool
};

export default AddCommentForm;
