import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { useHistory } from "react-router-dom";

import { validator } from "../../utility/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    // console.log(process.env);
    const history = useHistory();
    const [data, setData] = useState({ email: "", password: "", styOn: false });
    const [errors, setErrors] = useState({});
    const { logIn } = useAuth();
    // console.log(history.location.state.from.pathname);
    const handleChangeForm = (target) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
        try {
            await logIn(data);
            // отправляем только если валидно
            // console.log("Отправлено:", data);
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (e) {
            setErrors(e);
            // console.log(e);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <TextField
                        label={"Электронная почта"}
                        id={"email"}
                        name={"email"}
                        value={data.email}
                        placeholder={"Введите электронную почту"}
                        onChange={handleChangeForm}
                        error={errors.email}
                    />
                </div>
                <div className="mb-4">
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
                </div>

                <div className="mb-4">
                    <CheckBoxField
                        value={data.styOn}
                        onChange={handleChangeForm}
                        name="styOn"
                    >
                        Оставаться в системе
                    </CheckBoxField>
                </div>
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type={"submit"}
                    disabled={!isValid}
                >
                    Войти
                </button>
            </form>
        </>
    );
};

export default LoginForm;
