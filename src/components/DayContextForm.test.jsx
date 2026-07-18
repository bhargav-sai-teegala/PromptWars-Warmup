import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DayContextForm from './DayContextForm';

describe('DayContextForm', () => {
  it('renders all input fields', () => {
    render(<DayContextForm onSubmit={() => {}} isGenerating={false} />);
    
    expect(screen.getByLabelText(/Available Time & Schedule/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dietary Restrictions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of People/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct context on submit', () => {
    const mockSubmit = vi.fn();
    render(<DayContextForm onSubmit={mockSubmit} isGenerating={false} />);
    
    const timeInput = screen.getByLabelText(/Available Time & Schedule/i);
    fireEvent.change(timeInput, { target: { value: '1 hour' } });
    
    const submitBtn = screen.getByRole('button', { name: /Generate Meal Plan/i });
    fireEvent.click(submitBtn);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      time: '1 hour',
      diet: 'None',
      budget: '₹500',
      people: 2
    }));
  });

  it('disables submit button when generating', () => {
    render(<DayContextForm onSubmit={() => {}} isGenerating={true} />);
    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent(/Generating Plan/i);
  });
});
