import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useGif({ cloudName }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })

  const [gifOptions, setGifOptions] = React.useState({
    publicId: '',
    transformations: {}
  });

  const { data: url, isLoading, isError, isSuccess, isIdle, error } = useQuery(
    [`${gifOptions.publicId}-url`, gifOptions],
    async (key, gifOptions) => await cld.video_url(`${gifOptions.publicId}.gif`, {
      ...gifOptions.transformations,
      flags: "animated",
      effect: "loop",
    }),
    { enabled: gifOptions }
  )

  function generateUrl({ publicId, transformations = {} } = {}) {
    if (!publicId) {
      throw new Error("Must provide a public id of your asset")
    }

    // Attach { crop: 'scale' } automatically when height or width options are supplied. This is to handle applying those transformations properly
    if (
      (transformations.hasOwnProperty('width') || transformations.hasOwnProperty('height'))
      && !transformations.hasOwnProperty('crop')) {
      transformations.crop = 'scale';
    }

    // Attach { fetchFormat: 'auto' } automatically when no config is supplied. This will deliver the proper gif format automatically depending on your browser
    if (!transformations.hasOwnProperty('fetchFormat')) {
      transformations.fetchFormat = 'auto';
    }

    return setGifOptions({ publicId, transformations })
  }

  return { generateUrl, url, isLoading, isError, isIdle, isSuccess, error }

}
