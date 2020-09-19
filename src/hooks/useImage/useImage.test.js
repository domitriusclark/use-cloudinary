import { renderHook, act, cleanup } from "@testing-library/react-hooks";

import { useImage } from "../../index";

describe("useImage", () => {
  afterEach(cleanup);

  // condition for hook to throw error has been commented

  // it("throws an error when no cloud name is provided", async () => {
  //   const { result } = renderHook(() => useImage());
  //   await act(async () => await expect(result.error).toBeInstanceOf(Error))
  // });

  it("throws an error when no public_id is provided to getImage", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImage({ cloudName: "testing-hooks-upload" })
    );
    await act(async () => {
      await expect(() => result.current.generateUrl()).toThrow();
    });
  });

  it("updates status to loading when calling getImage", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImage({ cloudName: "testing-hooks-upload" })
    );
    await act(async () => {
      await result.current.generateUrl({ publicId: "test toasts" });
      expect(result.current.isLoading).toBeTruthy();
    });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBeTruthy();
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImage({ cloudName: "testing-hooks-upload" })
    );

    await act(async () => {
      await result.current.generateUrl({ publicId: "test toasts" });
    });

    await act(async () => await waitForNextUpdate());

    expect(result.current.url).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/);
  });
});
