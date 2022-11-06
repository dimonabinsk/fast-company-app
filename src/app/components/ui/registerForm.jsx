import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utility/validator";
import API from "../../../api";
import SelectField from "../common/form/selectField";
import SpinnerLoading from "../common/spinnerLoading";
// import PropTypes from "prop-types";

const RegisterForm = (props) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleChangeForm = ({ target }) => {
        // console.log(target.name);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта не корректна"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя-бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя-бы одну цифру"
            },
            isLength: {
                message: "Пароль должен содержать не менее 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        }
    };
    /**
     * Object.keys() вернёт массив ключей объекта с ошибками.
     * Если длина этого массива равна 0, то ошибок нет
     */
    const isValid = Object.keys(errors).length === 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            // отправляем только если валидно
            console.log("Отправлено:", data);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <TextField
                    label={"Электронная почта"}
                    id={"email"}
                    name={"email"}
                    value={data.email}
                    placeholder={"Введите электронную почту"}
                    onChange={handleChangeForm}
                    error={errors.email}
                />
                <TextField
                    label={"Пароль"}
                    type={"password"}
                    id={"password"}
                    name={"password"}
                    value={data.password}
                    placeholder={"Введите пароль"}
                    onChange={handleChangeForm}
                    error={errors.password}
                />
                <div className="mb-4">
                    {professions ? (
                        <SelectField
                            label="Выберите профессию"
                            value={data.profession}
                            onChange={handleChangeForm}
                            defaultOption="Выберите..."
                            options={professions}
                            error={errors.profession}
                            id="validationCustom04"
                        />
                    ) : (
                        <SpinnerLoading />
                    )}{" "}
                </div>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type={"submit"}
                    disabled={!isValid}
                >
                    Отправить
                </button>
            </form>
        </>
    );
};

// RegisterForm.propTypes = {};

export default RegisterForm;
