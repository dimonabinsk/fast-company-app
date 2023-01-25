export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "email или пароль введены не верно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        default:
            return "Слишком много попыток входа, попробуйте позже";
    }
}
