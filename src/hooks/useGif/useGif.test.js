import { renderHook, act, cleanup } from '@testing-library/react-hooks';

import {
  useGif,
} from '../../index';

describe('useGif', () => {
  afterEach(cleanup)

  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useGif());
    await act(async () => await expect(result.error).toBeInstanceOf(Error))
  });

  it("throws an error when no public_id is provided to getGif", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGif({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await expect(() => result.current.getGif()).toThrow();
    })

    await waitForNextUpdate()
  });

  it("updates status to loading when calling getGif", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGif({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await result.current.getGif({ public_id: "test toasts" })
      expect(result.current.status).toBe("loading");
    });

    await waitForNextUpdate()

    expect(result.current.status).toBe("success");
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGif({ cloud_name: "testing-hooks-upload" }));

    await act(async () => {
      result.current.getGif({ public_id: "test toasts" })
    });

    await act(async () => await waitForNextUpdate())

    expect(result.current.data).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/)
  });
})