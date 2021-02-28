import React from 'react';
import {
    render,
    cleanup,
    screen,
    act,
    fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatefulComponent from './stateful.component';

beforeEach(() => {
    render(<StatefulComponent />);
});

afterEach(cleanup);

describe('StatefulComponent', () => {
    it('shows "Click!" by default', () => {
        expect(screen.getByRole('button')).toHaveTextContent('Click!');
    });

    it('shows "Clicked" when clicked', async () => {
        act(() => {
            fireEvent.click(screen.getByRole('button'));
        });

        expect(await screen.findByRole('button')).toHaveTextContent('Clicked');
    });

    it('still shows "Clicked" when clicked multiple times', async () => {
        const button = screen.getByRole('button');

        act(() => {
            fireEvent.click(button);
        });
        act(() => {
            fireEvent.click(button);
        });
        expect(await screen.findByText('Clicked')).not.toBe(undefined);

        act(() => {
            fireEvent.click(button);
        });
        expect(await screen.findByText('Clicked')).not.toBe(undefined);
    });
});
