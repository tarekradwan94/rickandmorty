import constants from './constants';

let utils = {
    getPagedRMCharacters : async (page = 1) => {
        let charactersOutput = {
            error: null,
            data: null
        };

        try {
            // call rickandmortyapi.com API to get the characters
            let allRMCharactersURLString = constants.RMAPI.characters.all(page);
            let rawResponse = await fetch(allRMCharactersURLString);
            
            // check the response status, 200 - 299 is fine
            if (rawResponse.ok) {
                let contentType = rawResponse.headers.get('content-type');
                
                // check if the response is in JSON format
                if (contentType.includes("json")) {
                    let JSONResponse = await rawResponse.json();
                    charactersOutput.data = JSONResponse.results;
                } else {
                    // handle content-type error
                    charactersOutput.error = constants.errors.formatError;
                    charactersOutput.error.message = constants.errors.formatError.message(contentType);
                }
            } else {
                // handle server error response
                charactersOutput.error = constants.errors.responseError;
                charactersOutput.error.message = constants.errors.responseError.message(rawResponse.status, rawResponse.statusText);
            }
        } catch (error) {
            // handle unexpected error (usually network issues)
            charactersOutput.error = constants.errors.networkError;
            charactersOutput.error.message = constants.errors.networkError.message(error.toString());
        }

        return charactersOutput;
    },
};

export default utils;