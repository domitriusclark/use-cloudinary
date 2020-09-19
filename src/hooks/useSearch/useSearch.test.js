import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { Server, createServer } from "miragejs";

import { useSearch } from "../../index";

describe("useSearch", () => {
  afterEach(cleanup);

  it("throws an error with no endpoint", () => {
    const { result } = renderHook(() => useSearch());
    expect(result.error).toBeInstanceOf(Error);
  });

  it("returns status loading when a search is made", async () => {
    let server = new Server({
      routes() {
        this.post("/example-endpoint", () => {
          return new Promise((resolve) => {
            sendResponse = resolve;
          });
        });
      },
    });

    const { result } = renderHook(() =>
      useSearch({ endpoint: "/example-endpoint" })
    );

    act(() => {
      result.current.search({
        expression: "resource_type:image",
      });
    });

    expect(await result.current.isLoading).toBeTruthy();

    server.shutdown();
  });

  it("updates data to an array on successful request", async () => {
    let server = new Server({
      routes() {
        this.post("/example-endpoint", () => ({
          resources: [
            { id: 1, public_id: "image1" },
            { id: 2, public_id: "image2" },
            { id: 3, public_id: "image3" },
          ],
        }));
      },
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearch({ endpoint: "/example-endpoint" })
    );

    act(() => {
      result.current.search({
        expression: "resource_type:image",
      });
    });

    await waitForNextUpdate();

    expect(result.current.data.resources[0].id).toBe(1);
    expect(result.current.data.resources[1].id).toBe(2);
    expect(result.current.data.resources[2].id).toBe(3);

    server.shutdown();
  });

  it("returns an error when the request fails", () => {
    // TODO: TEST FOR FAILURE
  });
});
