import createCloudinaryUrl from '../../utils/createCloudinaryUrl';

export default function useAudio(cloudName) {
  const generateAudioUrl = createCloudinaryUrl(cloudName, 'audio');

  return {
    generateAudioUrl
  }
}
