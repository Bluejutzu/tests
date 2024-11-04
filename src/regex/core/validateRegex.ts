export const validateRegex = (inputString: string, regex: RegExp): boolean => {
    return regex.test(inputString);
};
