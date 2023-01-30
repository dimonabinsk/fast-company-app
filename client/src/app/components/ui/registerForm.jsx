import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import TextField from "../common/form/textField";
import { validator } from "../../utility/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
// import { useQualities } from "../../hooks/useQualities";
// import { useProfessions } from "../../hooks/useProfession";
// import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    // const { professions } = useProfessions();
    const professions = useSelector(getProfessions());
    // const { qualities } = useQualities();
    const qualities = useSelector(getQualities());
    // const { signUp } = useAuth();

    const professionsList = Array.isArray(professions)
        ? professions.map(({ name, _id }) => ({
              label: name,
              value: _id
          }))
        : Object.values(professions).map(({ name, _id }) => ({
              label: name,
              value: _id
          }));

    const qualitiesList = Array.isArray(qualities)
        ? qualities.map(({ name, _id, color }) => ({
              label: name,
              value: _id,
              color
          }))
        : Object.values(qualities).map(({ name, _id, color }) => ({
              label: name,
              value: _id,
              color
          }));

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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            isLength: {
                message: "Имя должно содержать не менее 3 символов",
                value: 3
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        dispatch(signUp(newData));
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
                        label={"Имя"}
                        id={"name"}
                        name={"name"}
                        value={data.name}
                        placeholder={"Введите имя"}
                        onChange={handleChangeForm}
                        error={errors.name}
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
                    <SelectField
                        label="Выберите профессию"
                        value={data.profession}
                        onChange={handleChangeForm}
                        defaultOption="Выберите..."
                        options={professionsList}
                        error={errors.profession}
                        id="validationCustom04"
                        name="profession"
                    />
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
                    <MultiSelectField
                        options={qualitiesList}
                        onChange={handleChangeForm}
                        name="qualities"
                        label="Выберете Ваше качество"
                        defaultValue={data.qualities}
                    />
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
                    Зарегистрироваться
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
