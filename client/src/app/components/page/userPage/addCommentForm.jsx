import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { validator } from "../../../utility/validator";
import { TextareaField } from "../../common/form";

const AddCommentForm = ({ onAddComment }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeForm = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const resetForm = () => {
        setData({});
        setErrors({});
    };

    const validatorConfig = {
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
                        <div className="mb-4"></div>
                        <div className="mb-4">
                            <TextareaField
                                value={data.content || ""}
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
