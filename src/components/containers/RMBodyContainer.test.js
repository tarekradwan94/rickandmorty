import {render} from '@testing-library/react';
import RMBodyContainer from './RMBodyContainer';
import RMLogo from '../../img/rm-logo.png';

jest.mock('../RMCharactersList', () => () => <div data-testid="rm-characters-list"></div>);

it("Check if RMBodyContainer renders the logo and RMCharactersList", () => {
    const body = render(<RMBodyContainer></RMBodyContainer>);
    expect(body.getByAltText("Rick and Morty logo")).toBeInTheDocument();
    expect(body.getByTestId("rm-characters-list")).toBeInTheDocument();
});

it("Check the logo image", () => {
    const body = render(<RMBodyContainer></RMBodyContainer>);
    const logo = body.getByAltText("Rick and Morty logo");
    expect(logo.src).toContain(RMLogo);
});