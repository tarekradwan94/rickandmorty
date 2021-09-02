import { render, screen } from '@testing-library/react';
import RMApp from './RMApp';

test('renders learn react link', () => {
  render(<RMApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
