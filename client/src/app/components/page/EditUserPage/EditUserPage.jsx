import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { validator } from "../../../utility/validator";
import SpinnerLoading from "../../common/spinnerLoading";
import {
    TextField,
    SelectField,
    RadioField,
    MultiSelectField
} from "../../common/form";

import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesLoadingStatus,
    getQualities
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUserData } from "../../../store/users";

const EditUserPage = () => {
    const [userLoad, setUserLoad] = useState(true);
    const [data, setData] = useState();
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    const qualities = useSelector(getQualities());
    const qualLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = getQualitiesList(qualities);

    const professions = useSelector(getProfessions());
    const profLoading = useSelector(getProfessionsLoadingStatus());
    const professionsList = getProfessionsList(professions);

    const [errors, setErrors] = useState({});
    const history = useHistory();

    function getQualitiesList(qual) {
        return Array.isArray(qual)
            ? qual.map(({ name, _id, color }) => ({
                  label: name,
                  value: _id,
                  color
              }))
            : Object.values(qual).map(({ name, _id, color }) => ({
                  label: name,
                  value: _id,
                  color
              }));
    }

    function getProfessionsList(prof) {
        return Array.isArray(prof)
            ? prof.map(({ name, _id }) => ({
                  label: name,
                  value: _id
              }))
            : Object.values(prof).map(({ name, _id }) => ({
                  label: name,
                  value: _id
              }));
    }

    function getQualitiesListByIds(id) {
        const qualitiesArray = [];
        for (const elemId of id) {
            for (const quality of qualities) {
                if (quality._id === elemId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    function transformQualities(qualities) {
        return getQualitiesListByIds(qualities).map((q) => ({
            label: q.name,
            value: q._id
        }));
    }

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(
            updateUserData({
                ...data,
                qualities: data.qualities.map((q) => q.value)
            })
        );
    }

    function handleChangeForm(target) {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }

    function handleGoBack() {
        history.goBack();
    }

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
                message: "Имя и фамилия обязательно для заполнения"
            },
            isName: {
                message:
                    "Имя и фамилия должны начинаться с большой буквы и состоять из двух слов"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        }
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        if (!profLoading && !qualLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformQualities(currentUser.qualities)
            });
        }
    }, [profLoading, qualLoading, currentUser, data]);

    useEffect(() => {
        if (data && userLoad) {
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
                                        options={professionsList}
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
                                        options={qualitiesList}
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
                                <button
                                    className="btn btn-primary w-100 mx-auto mt-3"
                                    onClick={handleGoBack}
                                    role="button"
                                >
                                    Вернуться назад
                                </button>
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

export default EditUserPage;
