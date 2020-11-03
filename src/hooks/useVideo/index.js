import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useVideo(cloudName) {
  const generateVideoUrl = createCloudinaryUrl(cloudName, "video")

  return {
    generateVideoUrl
  };
};