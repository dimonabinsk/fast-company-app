import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({
    label,
    name,
    value,
    placeholder,
    onChange,
    error,
    height
}) => {
    const getClassesInvalid = () => {
        return `form-control  ${error ? "is-invalid" : ""}`;
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
            )}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={getClassesInvalid()}
                    style={{ height: `${height}px` }}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

TextareaField.defaultProps = {
    height: "",
    placeholder: ""
};

TextareaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    height: PropTypes.string
};

export default TextareaField;
