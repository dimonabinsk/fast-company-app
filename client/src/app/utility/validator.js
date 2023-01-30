export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }

            case "isName": {
                const nameRegExp =
                    /^[А-ЯЁA-Z][а-яёa-z]*([-][А-ЯЁA-z][а-яёa-z]*)?\s[А-ЯЁA-Z][а-яёa-z]*$/g;
                statusValidate = !nameRegExp.test(data.trim());
                break;
            }

            case "isEmail": {
                const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
                statusValidate = !emailRegExp.test(data);
                break;
            }

            case "isCapitalSymbol": {
                const symbolRegExp = /[A-Z]+/g;
                statusValidate = !symbolRegExp.test(data);
                break;
            }

            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "isLength": {
                statusValidate = data.length < config.value;
                break;
            }

            default:
                break;
        }

        if (statusValidate) {
            return config.message;
        }
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
