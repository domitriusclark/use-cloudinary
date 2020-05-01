import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useAudio({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })

  const [audioOptions, setAudioOptions] = React.useState({
    public_id: '',
    transform_options: {}
  });

  const { data, status, error } = useQuery(audioOptions && [`${audioOptions.public_id}-url`, audioOptions], async (key, audioOptions) => {
    const audio = cld.video_url(`${audioOptions.public_id}.mp3`, {
      ...audioOptions.transform_options,
    })
    return audio;
  })

  function getAudio({ public_id, transform_options }) {
    return setAudioOptions({ public_id, transform_options })
  }

  return { getAudio, data, status, error }

}
