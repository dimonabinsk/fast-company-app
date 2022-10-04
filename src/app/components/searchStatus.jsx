import React from "react";
import PropTypes from "prop-types";

import { changeStr } from "../utility/declination";

const SearchStatus = ({ length }) => {
    return (
        <h2>
            <span
                className={`badge ${
                    length > 0 ? "bg-primary" : "bg-danger"
                } mx-2`}
            >
                {length > 0
                    ? `${length} ${changeStr(length)} с тобой сегодня`
                    : "Никто с тобой не тусанёт"}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
