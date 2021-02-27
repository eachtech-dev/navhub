import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from './useToggle.hook';

describe('useToggle', () => {
    it('has false as default value if unspecified', () => {
        const { result } = renderHook(() => useToggle());

        expect(result.current[0]).toBe(false);
    });

    it('applies default true value', () => {
        const { result } = renderHook(() => useToggle(true));

        expect(result.current[0]).toBe(true);
    });

    it('applies default false value', () => {
        const { result } = renderHook(() => useToggle(false));

        expect(result.current[0]).toBe(false);
    });

    it('toggles value', () => {
        const { result } = renderHook(() => useToggle(false));

        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(true);

        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(false);
    });
});
