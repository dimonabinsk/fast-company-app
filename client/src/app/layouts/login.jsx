import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

// import PropTypes from "prop-types";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <>
            <div className="container mt-5">
                <div className="w-75 mx-auto">
                    <div className="  p-3 shadow rounded-3">
                        {formType === "register" ? (
                            <>
                                <h3 className="mb-3 display-6">Регистрация</h3>
                                <RegisterForm />
                                <p>
                                    У вас уже есть учетная запись?{" "}
                                    <a role={"button"} onClick={toggleFormType}>
                                        Войти
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="mb-3 display-6">Авторизация</h3>
                                <LoginForm />

                                <p>
                                    У вас нет учетной записи?{" "}
                                    <a role={"button"} onClick={toggleFormType}>
                                        Зарегистрироваться
                                    </a>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// Login.propTypes = {};

export default Login;
