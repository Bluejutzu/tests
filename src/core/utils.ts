export const validateRegex = (inputString: string, regex: RegExp, test?: boolean): boolean => {
    const result = regex.exec(inputString);
    if (!result || typeof result == null) {
        return false;
    } else {
        test ? console.log(result[0]) : null;
        return true;
    }
};

export const getDate = () => {
    const now = new Date();
    const dateString = `${now.toISOString().slice(0, 10)}_${now.toTimeString().slice(0, 5).replace(":", "-")}`;
    return dateString;
};

export const delay = async (ms: number) => {
    return await new Promise(resolve => resolve(ms));
};
