import { render } from '@testing-library/react';
import RMApp from './RMApp';

jest.mock("./components/containers/RMBodyContainer", () => () => <div data-testid="rm-body-container"></div>);
jest.mock("./components/containers/RMFooterContainer", () => () => <div data-testid="rm-footer-container"></div>);

it("Check if RMApp renders RMBodyContainer and RMFooterContainer", () => {
  const app = render(<RMApp />);
  expect(app.getByTestId("rm-body-container")).toBeInTheDocument();
  expect(app.getByTestId("rm-footer-container")).toBeInTheDocument();
});