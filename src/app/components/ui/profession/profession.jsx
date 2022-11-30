import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../../hooks/useProfession";
import SpinnerLoading from "../../common/spinnerLoading";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    return !isLoading ? <p>{prof.name}</p> : <SpinnerLoading />;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
