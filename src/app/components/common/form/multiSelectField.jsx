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
        "67rdca3eeb7f6fgeed471198": "#0d6efd",
        "67rdca3eeb7f6fgeed471100": "#6c757d",
        "67rdca3eeb7f6fgeed4711012": "#198754",
        "67rdca3eeb7f6fgeed471101": "#dc3545",
        "67rdca3eeb7f6fgeed471102": "#0dcaf0",
        "67rdca3eeb7f6fgeed471103": "#212529"
    };

    const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "#fff" }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: "#eee",
            border: "none"
        }),
        option: (styles, { data }) => {
            // console.log("option", data);
            return {
                ...styles,
                color: "#eee",
                borderRadius: "5px",
                marginTop: "5px",
                marginBottom: "5px",
                paddingLeft: "15px",
                backgroundColor: `${colorBootstrap[data.value]}d9`,
                ":hover": {
                    color: "#fff",
                    backgroundColor: `${colorBootstrap[data.value]}`
                }
            };
        },
        multiValue: (styles, { data }) => {
            // console.log("multiValue", data);
            return {
                ...styles,
                backgroundColor: `${colorBootstrap[data.value]}d9`,
                borderRadius: "5px"
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "#fff"
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "#fff",
            ":hover": {
                color: "#fff",
                backgroundColor: `${colorBootstrap[data.value]}`,
                borderRadius: "5px"
            }
        })
    };

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
