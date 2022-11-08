import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utility/validator";
import API from "../../../api";
import SelectField from "../common/form/selectField";
import SpinnerLoading from "../common/spinnerLoading";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

const EditForm = ({ editId }) => {
    // console.log(editId);
    const history = useHistory();
    // console.log(history);
    const [user, setUser] = useState();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "",
        qualities: []
    });
    console.log(user ? user.name : "");
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);

    useEffect(() => {
        API.users.getById(editId).then((data) => {
            // console.log(data);
            setUser(data);
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

    // useEffect(() => {
    //     console.log(qualities);
    // }, [qualities]);

    const handleChangeForm = (target) => {
        // console.log(target.name);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setUser((prevState) => ({
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
            isName: {
                message:
                    "Имя должно содержать два слова и заглавные буквы в каждом слове"
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
    }, [data, user]);
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
        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // });
        API.users.update(editId, updateData);
        history.push(`/users/${editId}`);
    };

    return (
        <>
            {user && (
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextField
                            label={"Имя"}
                            type={"text"}
                            id={"name"}
                            name={"name"}
                            value={user.name}
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
                            value={user.email}
                            placeholder={"Введите электронную почту"}
                            onChange={handleChangeForm}
                            error={errors.email}
                        />
                    </div>

                    <div className="mb-4">
                        {professions.length > 0 ? (
                            <SelectField
                                label="Выберите профессию"
                                value={user.profession.name}
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
                            value={user.sex}
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
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type={"submit"}
                        disabled={!isValid}
                    >
                        Изменить
                    </button>
                </form>
            )}
        </>
    );
};

EditForm.propTypes = {
    editId: PropTypes.string
};

export default EditForm;
