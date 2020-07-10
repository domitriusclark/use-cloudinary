import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useVideo({ cloudName }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })

  if (!cloudName) {
    throw new Error("Please enter a valid cloud name")
  }

  const [videoOptions, setVideoOptions] = React.useState({
    publicId: '',
    transformations: {}
  });

  const { data: url, isIdle, isSuccess, isLoading, isError, error } = useQuery(
    [`${videoOptions.publicId}-url`, videoOptions],
    async (key, videoOptions) => await cld.video_url(videoOptions.publicId, { ...videoOptions.transformations }),
    { enabled: videoOptions }
  )

  function generateUrl({ publicId, transformations }) {
    if (!publicId) {
      throw new Error("Must provide a public id of your asset")
    }

    // Attach { crop: 'scale' } automatically when height or width options are supplied. This is to handle applying those transformations properly
    if (
      (transformations.hasOwnProperty('width') || transformations.hasOwnProperty('height'))
      && !transformations.hasOwnProperty('crop')) {
      transformations.crop = 'scale';
    }

    // Attach { fetchFormat: 'auto' } automatically when no config is supplied. This will deliver the best image format automatically depending on your browser
    if (!transformations.hasOwnProperty('fetchFormat')) {
      transformations.fetchFormat = 'auto';
    }

    // Attach { quality: 'auto' } automatically when no config is supplied
    if (!transformations.hasOwnProperty('quality')) {
      transformations.quality = 'auto';
    }

    return setVideoOptions({ publicId, transformations });
  }

  return { generateUrl, url, isIdle, isSuccess, isLoading, isError, error }

}
