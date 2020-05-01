import { renderHook, act, cleanup } from '@testing-library/react-hooks';

import {
  useVideo,
} from '../../index';

describe('useVideo', () => {
  afterEach(cleanup)

  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useVideo());
    await act(async () => await expect(result.error).toBeInstanceOf(Error))
  });

  it("throws an error when no public_id is provided to getVideo", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useVideo({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await expect(() => result.current.getVideo()).toThrow();
    })

    await waitForNextUpdate()
  });

  it("updates status to loading when calling getVideo", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useVideo({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await result.current.getVideo({ public_id: "trees" })

      expect(result.current.status).toBe("loading");
    });

    await waitForNextUpdate()

    expect(result.current.status).toBe("success");
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useVideo({ cloud_name: "testing-hooks-upload" }));

    await act(async () => {
      result.current.getVideo({ public_id: "trees" })
    });

    await act(async () => await waitForNextUpdate())

    expect(result.current.data).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/)
  });
})