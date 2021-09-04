import utils from './utils';
import charactersListPage3 from './test_assets/charactersListPage3.json';
import constants from './constants';

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