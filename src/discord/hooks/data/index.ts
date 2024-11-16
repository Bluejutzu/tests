export const responseReplies: { [code: number]: string | { [key: string]: string } } = {
    200: "Message successfully sent!",
    400: {
        default: "Error: An unknown issue has occurred.",
        "requestMessage cannot be longer than 1024 characters. (Parameter 'requestMessage')":
            "Error: The request message cannot be longer then 1024 characters long."
    },
    401: "Error: API key not valid for operation, user does not have authorization",
    403: "Error: Publish is not allowed on universe.",
    500: "Error: Server internal error / Unknown error."
};
