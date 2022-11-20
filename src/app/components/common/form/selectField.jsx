import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object" && options
            ? Object.values(options)
            : options;

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getClassesInvalid = () => {
        return `form-select  ${error ? "is-invalid" : ""}`;
    };

    return (
        <>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
            )}
            <select
                className={getClassesInvalid()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};

export default SelectField;
