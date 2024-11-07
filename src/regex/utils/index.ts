export const validateRegex = (inputString: string, regex: RegExp): boolean => {
    return regex.test(inputString);
};

export const getDate = () => {
    const now = new Date();
    const dateString = `${now.toISOString().slice(0, 10)}_${now.toTimeString().slice(0, 5).replace(":", "-")}`;
    return dateString;
};
