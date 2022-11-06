import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const dataArray =
        !Array.isArray(options) && typeof options === "object" && options
            ? Object.values(options)
            : options;

    const getClassesInvalid = () => {
        return `form-select  ${error ? "is-invalid" : ""}`;
    };

    return (
        <>
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getClassesInvalid()}
                id="validationCustom04"
                name="profession"
                value={value}
                onChange={onChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {dataArray &&
                    dataArray.map((data) => (
                        <option value={data._id} key={data._id}>
                            {data.name}
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
