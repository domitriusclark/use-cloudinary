import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useAudio(cloudName) {
  const generateAudioUrl = createCloudinaryUrl(cloudName, 'video');

  return {
    generateAudioUrl
  }
}
