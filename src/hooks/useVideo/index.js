import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useVideo(cloudName) {
  const generateUrl = createCloudinaryUrl(cloudName, "video")

  return {
    generateUrl
  }
}