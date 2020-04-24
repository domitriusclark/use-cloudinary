import {
  useImage,
  useVideo,
  useGif,
  useSearch,
  useUpload
} from './index';

import { renderHook, act } from "@testing-library/react-hooks";

describe('useMyHook', () => {
  it('displays an image with transformations', () => {
    const { result } = renderHook(() => useMyHook());

    expect(result.current).toBe(0);

    // Fast-forward 1sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 1 sec
    expect(result.current).toBe(1);

    // Fast-forward 1 more sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 2 sec
    expect(result.current).toBe(2);
  })
})
