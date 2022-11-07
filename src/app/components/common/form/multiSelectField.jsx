import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object" && options
            ? Object.values(options)
            : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };
    const animatedComponents = makeAnimated();

    const colorBootstrap = {
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        danger: "#dc3545",
        info: "#0dcaf0",
        dark: "#212529"
    };

    const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data }) => ({
            ...styles,
            color: colorBootstrap[data.color]
        }),
        multiValue: (styles, { data }) => ({
            ...styles,
            backgroundColor: colorBootstrap[data.color] + "d9",
            borderRadius: "5px"
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "#fff"
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "#fff",
            ":hover": {
                color: "#fff",
                backgroundColor: colorBootstrap[data.color],
                borderRadius: "5px"
            }
        })
    };

    // const themeColor = (theme) => {
    //     console.log(theme);
    //     return {
    //         ...theme,
    //         backgroundColor: "#fff",

    //         colors: {
    //             ...theme.color,
    //             primary25: "hotpink",
    //             primary: "black"
    //         }
    //     };
    // };
    return (
        <>
            <label className="form-label">{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                options={optionsArray}
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix={"select"}
                onChange={handleChange}
                name={name}
                placeholder="Выберете..."
                components={animatedComponents}
                styles={colorStyles}
                // theme={themeColor}
            />
        </>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
