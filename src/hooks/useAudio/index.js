import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useAudio({ cloudName }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })

  const [audioOptions, setAudioOptions] = React.useState({
    publicId: '',
    transformations: {}
  });

  const { data: url, isLoading, isError, isSuccess, isIdle, error } = useQuery(
    [`${audioOptions.publicId}-url`, audioOptions],
    async (key, audioOptions) => await cld.video_url(`${audioOptions.publicId}.mp3`, {
      ...audioOptions.transformations,
    }),
    { enabled: audioOptions }
  )

  function generateUrl({ publicId, transformations = {} } = {}) {
    if (!publicId) {
      throw new Error("Must provide a public id of your asset")
    }

    return setAudioOptions({ publicId, transformations })
  }

  return { generateUrl, url, isLoading, isError, isSuccess, isIdle, error }

}
