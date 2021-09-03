let constants = {
    RMAPI: {
        origin: "https://rickandmortyapi.com",
        root: "/api",
        characters: {
            all: (page = 1) => `${constants.RMAPI.origin}${constants.RMAPI.root}/character?page=${page}`,
            single: (id) => `${constants.RMAPI.origin}${constants.RMAPI.root}/character/${id}`,
        }
    },
    errors: {
        formatError: {
            code: "RM001",
            message: (wrongFormat) => `The API response format is ${wrongFormat} instead of JSON`,
            userMessage: "Apparently Rick and Morty's stars speak a language we don't speak!"
        },
        responseError: {
            code: "RM002",
            message: (statusCode, statusText) => `The API response status was ${statusCode} and the message was ${statusText}`,
            userMessage: "Rick and Morty's stars are busy! Maybe try later..."
        },
        networkError: {
            code: "RM003",
            message: (errorText) => `The API is unreachable: ${errorText}`,
            userMessage: "At the moment Rick and Morty's stars are on a different plant than yours. They will be back soon."
        }
    }
};

export default constants;