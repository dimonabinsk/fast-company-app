const monthDate = {
    0: "января",
    1: "февраля",
    2: "марта",
    3: "апреля",
    4: "мая",
    5: "июня",
    6: "июля",
    7: "августа",
    8: "сентября",
    9: "октября",
    10: "ноября",
    11: "декабря"
};

function getDateFormat(date, separator) {
    const day = addZero(date.getDate()); // Получаем день месяца.
    //   const month = setZero(1 + date.getMonth()); // Получаем месяц.
    const month = monthDate[date.getMonth()]; // Получаем месяц.
    const year = date.getFullYear(); // Получаем год.
    // Складываем все данные в строку через сепаратор и возвращаем.

    return `${day}${separator}${month}${separator}${year}г.`;
}
// Добавляем "0" вначале к числу , если число одноразрядное.
function addZero(number) {
    if (number < 10) number = `0${number}`;
    return number;
}

export function displayDate(data) {
    const date = new Date(parseInt(data));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = dateNow.getDate() - date.getDate();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();
                if (minutesDif >= 0 && minutesDif < 2) return "только что";
                if (minutesDif >= 2 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
                if (minutesDif >= 10 && minutesDif < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }
            return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
        }

        return `${addZero(date.getDate())} ${monthDate[date.getMonth()]}`;
    }

    return getDateFormat(date, " ");
}
