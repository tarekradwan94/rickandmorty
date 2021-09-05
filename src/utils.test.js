import utils from './utils';
import charactersListPage3 from './test_assets/charactersListPage3.json';
import constants from './constants';
import rick from './test_assets/rick.json';
import rickDetails from './test_assets/rickDetails.json';

it("Check characters list loading", async () => {
    let charactersData = await utils.getPagedRMCharacters("3");
    let charactersList = charactersData.data;
    let serializedCharactersList = JSON.stringify(charactersList);
    let serializedExpectedCharactersList = JSON.stringify(charactersListPage3);

    expect(serializedCharactersList).toBe(serializedExpectedCharactersList);
});

it("Check characters list when network error occurs", async () => {
    // mock the constants and change the endpoint to something that will fail
    let mockAPI  = jest.spyOn(constants.RMAPI.characters, "all").mockImplementation(() => "http://example");
    //the following will produce some errors in the console due to fetch() crash
    let errorData = await utils.getPagedRMCharacters("3");
    let errorCode = errorData.error?.code;

    expect(errorCode).toBe(constants.errors.networkError.code);
    mockAPI.mockRestore();
});

it("Check characters list when server error occurs", async () => {
    // mock the constants and change the endpoint to something that will fail
    let mockAPI  = jest.spyOn(constants.RMAPI.characters, "all").mockImplementation(() => "https://rickandmortyapi.com/api/characterX");
    let errorData = await utils.getPagedRMCharacters("3");
    let errorCode = errorData.error?.code;

    expect(errorCode).toBe(constants.errors.responseError.code);
    mockAPI.mockRestore();
});

it("Check characters list when format error occurs", async () => {
    // mock the constants and change the endpoint to something that will fail
    // http://www.geoplugin.net/xml.gp is just a random API that allows any origin and outputs in XML format
    let mockAPI  = jest.spyOn(constants.RMAPI.characters, "all").mockImplementation(() => "http://www.geoplugin.net/xml.gp");
    let errorData = await utils.getPagedRMCharacters("3");
    let errorCode = errorData.error?.code;
    
    expect(errorCode).toBe(constants.errors.formatError.code);
    mockAPI.mockRestore();
});

it("Check Rick details loading", async () => {
    let detailsData = await utils.getCharacterExtraDetails(rick);
    let detailsList = detailsData.data;
    let serializedDetailsList = JSON.stringify(detailsList);
    let serializedExpectedDetailsList = JSON.stringify(rickDetails);

    expect(serializedDetailsList).toBe(serializedExpectedDetailsList);
});

it("Check Rick details loading when origin url is wrong", async () => {
    // mock the character and change the endpoint to something that will fail
    let wrongOriginRick = {...rick};
    wrongOriginRick.origin = {...rick.origin};
    wrongOriginRick.origin.url = "http://example";
    //the following will produce some errors in the console due to fetch() crash
    let errorData = await utils.getCharacterExtraDetails(wrongOriginRick);
    let errorCode = errorData.error[0].code;

    expect(errorCode).toBe(constants.errors.networkError.code);
});

it("Check Rick details loading when location url is wrong", async () => {
    // mock the character and change the endpoint to something that will fail
    let wrongLocationRick = {...rick};
    wrongLocationRick.location = {...rick.location};
    wrongLocationRick.location.url = "http://example";
    //the following will produce some errors in the console due to fetch() crash
    let errorData = await utils.getCharacterExtraDetails(wrongLocationRick);
    let errorCode = errorData.error[0].code;

    expect(errorCode).toBe(constants.errors.networkError.code);
});

it("Check Rick details loading when origin server error occurs", async () => {
    // mock the character and change the endpoint to something that will fail
    let wrongOriginRick = {...rick};
    wrongOriginRick.origin = {...rick.origin};
    wrongOriginRick.origin.url = "https://rickandmortyapi.com/api/characterX";
    let detailsData = await utils.getCharacterExtraDetails(wrongOriginRick);
    let detailsList = detailsData.data;
    let serializedDetailsList = JSON.stringify(detailsList);
    let wrongOriginRickDetails = [...rickDetails];
    wrongOriginRickDetails.splice(0, 1, undefined); //response 0 is origin
    let serializedExpectedDetailsList = JSON.stringify(wrongOriginRickDetails);

    let errorCode = detailsData.error[0].code;

    expect(serializedDetailsList).toBe(serializedExpectedDetailsList);
    expect(errorCode).toBe(constants.errors.responseError.code);
}); 

it("Check Rick details loading when location server error occurs", async () => {
    // mock the character and change the endpoint to something that will fail
    let wrongLocationRick = {...rick};
    wrongLocationRick.location = {...rick.location};
    wrongLocationRick.location.url = "https://rickandmortyapi.com/api/characterX";
    let detailsData = await utils.getCharacterExtraDetails(wrongLocationRick);
    let detailsList = detailsData.data;
    let serializedDetailsList = JSON.stringify(detailsList);
    let wrongLocationRickDetails = [...rickDetails];
    wrongLocationRickDetails.splice(1, 1, undefined); //response 1 is location
    let serializedExpectedDetailsList = JSON.stringify(wrongLocationRickDetails);

    let errorCode = detailsData.error[0].code;

    expect(serializedDetailsList).toBe(serializedExpectedDetailsList);
    expect(errorCode).toBe(constants.errors.responseError.code);
}); 

it("Check Rick details loading when origin format error occurs", async () => {
    // mock the character and change the endpoint to something that will fail
    let wrongOriginRick = {...rick};
    wrongOriginRick.origin = {...rick.origin};
    // http://www.geoplugin.net/xml.gp is just a random API that allows any origin and outputs in XML format
    wrongOriginRick.origin.url = "http://www.geoplugin.net/xml.gp";
    let detailsData = await utils.getCharacterExtraDetails(wrongOriginRick);
    let detailsList = detailsData.data;
    let serializedDetailsList = JSON.stringify(detailsList);
    let wrongOriginRickDetails = [...rickDetails];
    wrongOriginRickDetails.splice(0, 1, undefined); //response 0 is origin
    let serializedExpectedDetailsList = JSON.stringify(wrongOriginRickDetails);

    let errorCode = detailsData.error[0].code;

    expect(serializedDetailsList).toBe(serializedExpectedDetailsList);
    expect(errorCode).toBe(constants.errors.formatError.code);
}); 

it("Check Rick details loading when location format error occurs", async () => {
    // mock the character and change the endpoint to something that will fail
    let wrongLocationRick = {...rick};
    wrongLocationRick.location = {...rick.location};
    // http://www.geoplugin.net/xml.gp is just a random API that allows any origin and outputs in XML format
    wrongLocationRick.location.url = "http://www.geoplugin.net/xml.gp";
    let detailsData = await utils.getCharacterExtraDetails(wrongLocationRick);
    let detailsList = detailsData.data;
    let serializedDetailsList = JSON.stringify(detailsList);
    let wrongLocationRickDetails = [...rickDetails];
    wrongLocationRickDetails.splice(1, 1, undefined); //response 1 is location
    let serializedExpectedDetailsList = JSON.stringify(wrongLocationRickDetails);

    let errorCode = detailsData.error[0].code;

    expect(serializedDetailsList).toBe(serializedExpectedDetailsList);
    expect(errorCode).toBe(constants.errors.formatError.code);
}); 