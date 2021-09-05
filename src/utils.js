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
                    charactersOutput.error = Object.assign({}, constants.errors.formatError);
                    charactersOutput.error.message = constants.errors.formatError.message(contentType);
                }
            } else {
                // handle server error response
                charactersOutput.error = Object.assign({}, constants.errors.responseError);
                charactersOutput.error.message = constants.errors.responseError.message(rawResponse.status, rawResponse.statusText);
            }
        } catch (error) {
            // handle unexpected error (usually network issues)
            charactersOutput.error = Object.assign({}, constants.errors.networkError);
            charactersOutput.error.message = constants.errors.networkError.message(error.toString());
        }

        return charactersOutput;
    },

    getCharacterExtraDetails: async (character) => {
        let detailsOutput = {
            error: null,
            data: null
        };

        let originURLString = character.origin.url;
        let originPromise = originURLString ? fetch(originURLString) : "" ; //origin might be unknown

        let locationURLString = character.location.url;
        let locationPromise = locationURLString ? fetch(locationURLString) : ""; //location might be unknown

        let episodesURLStringList = character.episode;
        let episodesPromiseList = episodesURLStringList.map((episodeURLString) => fetch(episodeURLString));

        try {
            //make all requests together, with first one as origin, second one as location and then all episodes
            let rawResponses = await Promise.all([originPromise, locationPromise, ...episodesPromiseList]);

            let JSONPromises = rawResponses.map((rawResponse) => {
                if(rawResponse === "") { //unknown origin or location 
                    return "";
                }
                // check the response status, 200 - 299 is fine
                else if (rawResponse.ok) {
                    let contentType = rawResponse.headers.get('content-type');
                    
                    // check if the response is in JSON format
                    if (contentType.includes("json")) {
                        return rawResponse.json();
                    } else {
                        // handle content-type error
                        detailsOutput.error = detailsOutput.error || [];
                        let formatError = Object.assign({}, constants.errors.formatError);
                        formatError.message = constants.errors.formatError.message(contentType);
                        detailsOutput.error.push(formatError);
                        return undefined;
                    }
                } else {
                    // handle server error response
                    detailsOutput.error = detailsOutput.error || [];
                    let responseError = Object.assign({}, constants.errors.responseError);
                    responseError.message = constants.errors.responseError.message(rawResponse.status, rawResponse.statusText);
                    detailsOutput.error.push(responseError);
                    return undefined;
                }
            });

            detailsOutput.data = await Promise.all([...JSONPromises]);

        } catch (error) {
            // handle unexpected error (usually network issues)
            detailsOutput.error = detailsOutput.error || [];
            let networkError = Object.assign({}, constants.errors.networkError);
            networkError.message = constants.errors.networkError.message(error.toString());
            detailsOutput.error.push(networkError);
        }

        return detailsOutput;
    }
};

export default utils;