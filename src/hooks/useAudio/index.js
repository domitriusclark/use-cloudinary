import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useAudio({ cloudName }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })

  const [audioOptions, setAudioOptions] = React.useState({
    publicId: '',
    transformations: {}
  });

  const { data: url, status, error } = useQuery(audioOptions && [`${audioOptions.publicId}-url`, audioOptions], async (key, audioOptions) => {
    const audio = cld.video_url(`${audioOptions.publicId}.mp3`, {
      ...audioOptions.transformations,
    })
    return audio;
  })

  function generateUrl({ publicId, transformations }) {
    return setAudioOptions({ publicId, transformations })
  }

  return { generateUrl, url, status, error }

}
