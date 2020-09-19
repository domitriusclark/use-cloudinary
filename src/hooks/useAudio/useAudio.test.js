import { renderHook, act, cleanup } from "@testing-library/react-hooks";

import { useAudio } from "../../index";

describe("useAudio", () => {
  afterEach(cleanup);

  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useAudio());
    await act(async () => await expect(result.error).toBeInstanceOf(Error));
  });

  it("throws an error when no publicId is provided to generateUrl", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAudio({ cloud_name: "testing-hooks-upload" })
    );
    await act(async () => {
      await expect(() => result.current.generateUrl()).toThrow();
    });

    await waitForNextUpdate();
  });

  it("updates status to loading when calling generateUrl", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAudio({ cloudName: "testing-hooks-upload" })
    );
    await act(async () => {
      await result.current.generateUrl({ publicId: "game-sounds/switch" });
      expect(result.current.isLoading).toBeTruthy();
    });
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAudio({ cloudName: "testing-hooks-upload" })
    );

    await act(async () => {
      result.current.generateUrl({ publicId: "game-sounds/switch" });
    });

    await act(async () => {
      await waitForNextUpdate();
      expect(result.current.url).toMatch(
        /https?:\/\/res\.cloudinary\.com\/\S+/
      );
    });
  });
});
