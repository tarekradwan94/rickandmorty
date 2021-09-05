import { render, waitFor } from "@testing-library/react";
import RMCharactersList from "./RMCharactersList";

jest.mock("./RMCharacterCard", () => () => <div data-testid="rm-character-card"></div>);

it("Check if RMCharactersList renders RMCharacters cards", async () => {
    const list = render(<RMCharactersList></RMCharactersList>);
    const cards = await waitFor(() => list.getAllByTestId("rm-character-card"));
    expect(cards.length).toBe(20);
    expect(cards[0]).toBeInTheDocument();
});