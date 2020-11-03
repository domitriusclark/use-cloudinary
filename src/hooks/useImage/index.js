import { useInView } from "react-intersection-observer";
import useNativeLazyLoading from "@charlietango/use-native-lazy-loading";
import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useImage(cloudName) {
  const supportsLazyLoading = useNativeLazyLoading();

  const [ref, inView] = useInView({
    triggerOnce: true
  });

  function blurredPlaceholderUrl({ publicId, width, height }) {
    if (!width && !height) {
      return generateUrl({
        delivery: {
          publicId
        },
        transformation: {
          effect: "blur:1000",
          quality: 1,
          fetch: 'auto'
        }
      })

    } else if (!height) {
      return generateUrl({
        delivery: {
          publicId
        },
        transformation: {
          crop: 'scale',
          width,
          effect: "blur:1000",
          quality: 1,
          fetch: 'auto'
        }
      })
    } else if (!width) {
      return generateUrl({
        delivery: {
          publicId
        },
        transformation: {
          crop: 'scale',
          height,
          effect: "blur:1000",
          quality: 1,
          fetch: 'auto'
        }
      })
    } else {
      return generateUrl({
        delivery: {
          publicId
        },
        transformation: {
          crop: 'scale',
          width,
          height,
          effect: "blur:1000",
          quality: 1,
          fetch: 'auto'
        }
      })
    }
  }

  const generateImageUrl = createCloudinaryUrl(cloudName, "image");

  return {
    generateImageUrl,
    blurredPlaceholderUrl,
    supportsLazyLoading,
    ref,
    inView
  };
}




