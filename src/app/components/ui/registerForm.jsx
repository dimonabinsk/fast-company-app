import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utility/validator";
import API from "../../../api";
import SelectField from "../common/form/selectField";
import SpinnerLoading from "../common/spinnerLoading";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

// import PropTypes from "prop-types";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Array.isArray(data)
                ? data.map(({ name, _id }) => ({
                      label: name,
                      value: _id
                  }))
                : Object.values(data).map(({ name, _id }) => ({
                      label: name,
                      value: _id
                  }));
            setProfessions(professionsList);
        });

        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Array.isArray(data)
                ? data.map(({ name, _id, color }) => ({
                      label: name,
                      value: _id,
                      color
                  }))
                : Object.values(data).map(({ name, _id, color }) => ({
                      label: name,
                      value: _id,
                      color
                  }));
            setQualities(qualitiesList);
        });
    }, []);

    // useEffect(() => {
    //     console.log(qualities);
    // }, [qualities]);

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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
                    {professions.length > 0 ? (
                        <SelectField
                            label="Выберите профессию"
                            value={data.profession}
                            onChange={handleChangeForm}
                            defaultOption="Выберите..."
                            options={professions}
                            error={errors.profession}
                            id="validationCustom04"
                            name="profession"
                        />
                    ) : (
                        <SpinnerLoading />
                    )}{" "}
                </div>
                <div className="mb-4">
                    <RadioField
                        options={[
                            { name: "Муж", value: "male" },
                            { name: "Жен", value: "female" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChangeForm}
                        label="Выберете пол:"
                    />
                </div>
                <div className="mb-4">
                    {qualities.length > 0 ? (
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChangeForm}
                            name="qualities"
                            label="Выберете Ваше качество"
                            defaultValue={data.qualities}
                        />
                    ) : (
                        <SpinnerLoading />
                    )}
                </div>
                <div className="mb-4">
                    <CheckBoxField
                        value={data.license}
                        onChange={handleChangeForm}
                        name="license"
                        error={errors.license}
                    >
                        Подтвердить{" "}
                        <a className="pointer-event" role={"button"}>
                            <i>лицензионное соглашение</i>
                        </a>
                    </CheckBoxField>
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
