import { render } from "@testing-library/react";
import RMCharacterCard from "./RMCharacterCard";
import charactersListPage3 from '../test_assets/charactersListPage3.json';

it("Check separator is shown be default", () => {
    const card = render(<RMCharacterCard character={charactersListPage3[0]}></RMCharacterCard>);
    expect(card.container.querySelector(".separator")).toBeInTheDocument();
});

it("Check separator is hidden with prop", () => {
    const card = render(<RMCharacterCard character={charactersListPage3[0]} hideSeparator={true}></RMCharacterCard>);
    expect(card.container.querySelector(".separator")).not.toBeInTheDocument();
});