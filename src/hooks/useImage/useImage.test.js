import { renderHook, act, cleanup } from '@testing-library/react-hooks';

import {
  useImage,
} from '../../index';

describe('useImage', () => {
  afterEach(cleanup)
  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useImage());
    await act(async () => await expect(result.error).toBeInstanceOf(Error))
  });

  it("throws an error when no public_id is provided to getImage", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useImage({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await expect(() => result.current.getImage()).toThrow();
    });

    await waitForNextUpdate()
  });

  it("updates status to loading when calling getImage", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useImage({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await result.current.getImage({ public_id: "test toasts" })
      expect(result.current.status).toBe("loading");
    });

    await waitForNextUpdate()

    expect(result.current.status).toBe("success");
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useImage({ cloud_name: "testing-hooks-upload" }));

    await act(async () => {
      await result.current.getImage({ public_id: "test toasts" })
    });

    await act(async () => await waitForNextUpdate())

    expect(result.current.data).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/)
  });
})