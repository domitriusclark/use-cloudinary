import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useAudio(cloudName) {
  const generateGifUrl = createCloudinaryUrl(cloudName, 'video');

  return {
    generateGifUrl
  }
}
