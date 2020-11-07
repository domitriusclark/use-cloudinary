/**
 * @jest-environment node
 */
import createCloudinaryUrl from "../createCloudinaryUrl";

describe("createCloudinaryUrl", () => {
  describe("image", () => {
    test("defaults", () => {
      const generateImageUrl = createCloudinaryUrl("test", "image");
      const url = generateImageUrl({
        delivery: {
          publicId: "my-image",
        },
      });
      expect(url).toMatchInlineSnapshot(
        `"http://res.cloudinary.com/test/image/upload/f_auto,q_auto/v1/my-image"`
      );
    });

    test("transformation", () => {
      const generateImageUrl = createCloudinaryUrl("test", "image");
      const url = generateImageUrl({
        delivery: {
          publicId: "my-image",
        },
        transformation: {
          width: 200,
          height: 400,
          crop: "fill",
          gravity: "face",
          fetchFormat: "jpg",
          quality: 85,
        },
      });
      expect(url).toMatchInlineSnapshot(
        `"http://res.cloudinary.com/test/image/upload/c_scale,f_jpg,g_face,h_400,q_85,w_200/v1/my-image"`
      );
    });
  });

  test.todo("video");
  test.todo("gif");
  test.todo("audio");
});
