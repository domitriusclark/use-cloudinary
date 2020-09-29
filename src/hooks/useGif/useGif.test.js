import { renderHook, act, cleanup } from "@testing-library/react-hooks";

import { useGif } from "../../index";

describe("useGif", () => {
  afterEach(cleanup);

  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useGif());
    await act(async () => await expect(result.error).toBeInstanceOf(Error));
  });

  it("throws an error when no publicId is provided to generateUrl", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGif({ cloud_name: "testing-hooks-upload" })
    );
    await act(async () => {
      await expect(() => result.current.getGif()).toThrow();
    });

    await waitForNextUpdate();
  });

  it("updates status to loading when calling generateUrl", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGif({ cloudName: "testing-hooks-upload" })
    );
    await act(async () => {
      await result.current.generateUrl({ publicId: "test toasts" });
      expect(result.current.isLoading).toBeTruthy();
    });

    await waitForNextUpdate();
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGif({ cloudName: "testing-hooks-upload" })
    );

    await act(async () => {
      result.current.generateUrl({ publicId: "test toasts" });
    });

    await act(async () => await waitForNextUpdate());

    expect(result.current.url).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/);
  });
});
