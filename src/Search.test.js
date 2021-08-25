import { render, screen } from '@testing-library/react';
import Search from './Search';

test('renders header', () => {
  render(<Search />);
  const header = screen.getByText(/Find a test centre/i);
  expect(header).toBeInTheDocument();
});
