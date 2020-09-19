import { renderHook, act, cleanup } from "@testing-library/react-hooks";

import { useVideo } from "../../index";

describe("useVideo", () => {
  afterEach(cleanup);

  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useVideo());
    await act(async () => await expect(result.error).toBeInstanceOf(Error));
  });

  it("throws an error when no publicId is provided to getVideo", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useVideo({ cloudName: "testing-hooks-upload" })
    );
    await act(async () => {
      await expect(() => result.current.generateUrl()).toThrow();
    });

    await waitForNextUpdate();
  });

  it("updates status to loading when calling getVideo", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useVideo({ cloudName: "testing-hooks-upload" })
    );
    await act(async () => {
      await result.current.generateUrl({ publicId: "trees" });

      expect(result.current.isLoading).toBeTruthy();
    });

    await waitForNextUpdate();

    expect(result.current.isSuccess).toBeTruthy();
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useVideo({ cloudName: "testing-hooks-upload" })
    );

    await act(async () => {
      result.current.generateUrl({ publicId: "trees" });
    });

    await act(async () => await waitForNextUpdate());

    expect(result.current.url).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/);
  });
});
