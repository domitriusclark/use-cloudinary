/**
 * @jest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react-hooks";
import useImage from "../";

describe("useImage", () => {
  test("basic usage", () => {
    const { result } = renderHook(() => useImage("test"));
    act(() => {});
    const placeholderUrl = result.current.blurredPlaceholderUrl({
      publicId: "my-image",
      width: 200,
      width: 400,
    });
    const imageUrl = result.current.generateImageUrl({
      delivery: {
        publicId: "my-image",
      },
      transformation: {
        width: 200,
        width: 400,
      },
    });
    expect(placeholderUrl).toMatchInlineSnapshot(
      `"http://res.cloudinary.com/test/image/upload/c_scale,e_blur:1000,f_auto,q_1,w_400/v1/my-image"`
    );
    expect(imageUrl).toMatchInlineSnapshot(
      `"http://res.cloudinary.com/test/image/upload/c_scale,f_auto,q_auto,w_400/v1/my-image"`
    );
  });
});
