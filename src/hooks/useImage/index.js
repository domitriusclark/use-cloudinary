import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useImage(cloudName) {
  const generateImageUrl = createCloudinaryUrl(cloudName, "image");

  return {
    generateImageUrl,
  };
}




