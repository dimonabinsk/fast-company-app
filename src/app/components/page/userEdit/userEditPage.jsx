import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import { validator } from "../../../utility/validator";
import SpinnerLoading from "../../common/spinnerLoading";
import {
    TextField,
    SelectField,
    RadioField,
    MultiSelectField
} from "../../common/form";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [data, setData] = useState();
    const [userLoad, setUserLoad] = useState(true);
    const [errors, setErrors] = useState({});

    const { currentUser, updateUserData } = useAuth();
    const { professions, isLoading: profLoading } = useProfessions();
    const { qualities, isLoading: qualLoading } = useQualities();

    function getQualities(id) {
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
        return getQualities(qualities).map((q) => ({
            label: q.name,
            value: q._id
        }));
    }

    function transformUpdateQualities(data) {
        return data.map((q) => q.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUserData({
                ...data,
                qualities: transformUpdateQualities(data.qualities)
            });
            history.push(`/user/${userId}`);
        } catch (e) {
            setErrors(e);
        }
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

    const validatorConfig = {
        email: {
            isRequired: {
                message: "?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "?????????????????????? ?????????? ???? ??????????????????"
            }
        },
        name: {
            isRequired: {
                message: "?????? ?? ?????????????? ?????????????????????? ?????? ????????????????????"
            },
            isName: {
                message:
                    "?????? ?? ?????????????? ???????????? ???????????????????? ?? ?????????????? ?????????? ?? ???????????????? ???? ???????? ????????"
            }
        },
        profession: {
            isRequired: {
                message: "?????????????????????? ???????????????? ???????? ??????????????????"
            }
        }
    };

    const isValid = Object.keys(errors).length === 0;

    function validate() {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

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
                        <h3>???????????????? ???????????? ?? ????????????????????????</h3>
                        {!userLoad && professions.length ? (
                            <form action="" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <TextField
                                        label={"??????"}
                                        type={"text"}
                                        id={"name"}
                                        name={"name"}
                                        value={data.name}
                                        placeholder={"?????????????? ??????"}
                                        onChange={handleChangeForm}
                                        error={errors.name}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextField
                                        label={"?????????????????????? ??????????"}
                                        id={"email"}
                                        name={"email"}
                                        value={data.email}
                                        placeholder={
                                            "?????????????? ?????????????????????? ??????????"
                                        }
                                        onChange={handleChangeForm}
                                        error={errors.email}
                                    />
                                </div>

                                <div className="mb-4">
                                    <SelectField
                                        label="???????????????? ??????????????????"
                                        value={data.profession}
                                        onChange={handleChangeForm}
                                        defaultOption="????????????????..."
                                        options={getProfessionsList(
                                            professions
                                        )}
                                        error={errors.profession}
                                        id="profession"
                                        name="profession"
                                    />
                                </div>
                                <div className="mb-4">
                                    <RadioField
                                        options={[
                                            { name: "??????", value: "male" },
                                            { name: "??????", value: "female" }
                                        ]}
                                        value={data.sex}
                                        name="sex"
                                        onChange={handleChangeForm}
                                        label="???????????????? ??????:"
                                    />
                                </div>
                                <div className="mb-4">
                                    <MultiSelectField
                                        options={getQualitiesList(qualities)}
                                        onChange={handleChangeForm}
                                        name="qualities"
                                        label="???????????????? ???????? ????????????????"
                                        defaultValue={data.qualities}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type={"submit"}
                                    disabled={!isValid}
                                >
                                    ???????????????? ?? ?????????????????? ??????????
                                </button>
                                <Link
                                    to={`user/${userId}`}
                                    className="btn btn-primary w-100 mx-auto mt-3"
                                    onClick={handleGoBack}
                                    role="button"
                                >
                                    ?????????????????? ??????????
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
