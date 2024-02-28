import { render, screen, fireEvent } from '@testing-library/react';
import List from '../components/List';

const mockSchool = [
    {
        school_name: 'test school name',
        dbn: '02M260',
        overview_paragraph: 'test paragraph'
    }
] 

test('renders List component', () => {
  const mockBTN = jest.fn();
  const prev =jest.fn()
  const next =jest.fn()
  render(<List schools={mockSchool} showMore={mockBTN} prev={prev} next={next}/>);

  const firstItem = screen.getByText(/test school name/i);
  expect(firstItem).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Show more/i))
  expect(mockBTN).toHaveBeenCalledTimes(1)
});