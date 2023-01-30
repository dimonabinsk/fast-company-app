import React from "react";
import PropTypes from "prop-types";

const SearchQuery = ({ onSearch, value }) => {
    return (
        <>
            <input
                type={"text"}
                name={"search"}
                placeholder={"Поиск"}
                className={"form-control mb-3 px-3 py-2 bg-light shadow-sm"}
                onChange={onSearch}
                value={value}
            />
        </>
    );
};

SearchQuery.propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default SearchQuery;
