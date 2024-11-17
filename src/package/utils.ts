const validateRegex = (inputString: string, regex: RegExp, test?: boolean): boolean => {
    const result = regex.exec(inputString);
    if (!result || typeof result == null) {
        return false;
    } else {
        test ? console.log('Match found:', result[0]) : null;
        return true;
    }
};

const getDate = () => {
    const now = new Date();
    const dateString = `${now.toISOString().slice(0, 10)}_${now.toTimeString().slice(0, 5).replace(":", "-")}`;
    return dateString;
};

const delay = async (ms: number) => {
    return await new Promise(resolve => resolve(ms));
};

export const utils = {
    validateRegex,
    getDate,
    delay
}
