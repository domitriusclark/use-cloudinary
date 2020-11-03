import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useAudio(cloudName) {
  const generateUrl = createCloudinaryUrl(cloudName, 'video');

  return {
    generateUrl
  }
}
