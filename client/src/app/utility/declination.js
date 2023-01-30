const declinationOfTheString = (num, word) => {
    if (word.length !== 2 && word.length !== 3) {
        throw new Error("Введён НЕ корректный массив");
    } else {
        if (word.length === 3) {
            const cases = [2, 0, 1, 1, 1, 2];
            return word[
                num % 100 > 4 && num % 100 < 20
                    ? 2
                    : cases[num % 10 < 5 ? num % 10 : 5]
            ];
        }
        if (word.length === 2) {
            const cases = [0, 0, 1, 1, 1, 0];
            return word[
                num % 100 > 4 && num % 100 < 20
                    ? 0
                    : cases[num % 10 < 5 ? num % 10 : 5]
            ];
        }
    }
};

export const changeStr = (count) => {
    const arrMan = ["человек тусанёт", "человека тусанут"];
    const strMan = `${declinationOfTheString(count, arrMan)}`;
    return strMan;
};

export const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) {
        return "человек тусанёт";
    }
    if (lastOne === 1) return "человек тусанёт";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    return "человек тусанёт";
};
