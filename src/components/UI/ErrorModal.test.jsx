import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorModal from './ErrorModal';

describe('Component', () => {
  it('Should render the component', () => {
    const { queryByText, getByRole } = render(<ErrorModal/>);

    const text = screen.queryByText('About', {});


    const button = screen.getByRole('button', { name: /disabled button/i });
    userEvent.click(button);
  });
});
