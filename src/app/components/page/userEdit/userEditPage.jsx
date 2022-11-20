import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
// import PropTypes from "prop-types";

import API from "../../../../api";
import { validator } from "../../../utility/validator";
import SpinnerLoading from "../../common/spinnerLoading";
import {
    TextField,
    SelectField,
    RadioField,
    MultiSelectField
} from "../../common/form";

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [userLoad, setUserLoad] = useState(false);
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);

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
        const updateData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        API.users.update(userId, updateData).then(() => {
            history.goBack();
        });
    };

    const handleChangeForm = (target) => {
        // console.log(target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const transformQualities = (qualities) => {
        return qualities.map((q) => ({
            label: q.name,
            value: q._id
        }));
    };

    useEffect(() => {
        API.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setData((prev) => ({
                ...prev,
                ...data,
                qualities: transformQualities(qualities),
                profession: profession._id
            }));
            setUserLoad(true);
        });
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
            isName: {
                message: "Имя и фамилия должны начинаться с большой буквы"
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
        if (data._id) {
            setUserLoad(false);
        }
        validate();
    }, [data]);

    return (
        <>
            <div className="container mt-5">
                <div className="w-75 mx-auto">
                    <div className="  p-3 shadow rounded-3">
                        <h3>Обновить данные о пользователе</h3>

                        {!userLoad && professions.length ? (
                            <form action="" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <TextField
                                        label={"Имя"}
                                        type={"text"}
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
                                        label={"Электронная почта"}
                                        id={"email"}
                                        name={"email"}
                                        value={data.email}
                                        placeholder={
                                            "Введите электронную почту"
                                        }
                                        onChange={handleChangeForm}
                                        error={errors.email}
                                    />
                                </div>

                                <div className="mb-4">
                                    <SelectField
                                        label="Выберите профессию"
                                        value={data.profession}
                                        onChange={handleChangeForm}
                                        defaultOption="Выберите..."
                                        options={professions}
                                        error={errors.profession}
                                        id="profession"
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
                                        options={qualities}
                                        onChange={handleChangeForm}
                                        name="qualities"
                                        label="Выберете Ваше качество"
                                        defaultValue={data.qualities}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type={"submit"}
                                    disabled={!isValid}
                                >
                                    Обновить и вернуться назад
                                </button>
                                <Link
                                    to={`user/${userId}`}
                                    className="btn btn-primary w-100 mx-auto mt-3"
                                    onClick={handleGoBack}
                                    role="button"
                                >
                                    Вернуться назад
                                </Link>
                            </form>
                        ) : (
                            <SpinnerLoading />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// UserEditPage.propTypes = {
//     edit: PropTypes.string
// };

export default UserEditPage;
