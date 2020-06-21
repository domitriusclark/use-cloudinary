import * as React from 'react';
import { useQuery } from 'react-query'
import cloudinary from 'cloudinary-core'

export default function useImage({ cloudName } = {}) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })

  if (!cloudName) {
    throw new Error("Please enter a valid cloud name")
  }

  const [imageOptions, setImageOptions] = React.useState({
    public_id: '',
    transform_options: {}
  });

  const { data: url, status, error } = useQuery(imageOptions && [`${imageOptions.public_id}-url`, imageOptions], async (key, imageOptions) => {
    return await cld.url(imageOptions.publicId, { ...imageOptions.transformations });
  })

  function generateUrl({ publicId, transformations } = {}) {
    if (!public_id) {
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

    return setImageOptions({ publicId, transformations });
  }

  return { generateUrl, url, status, error }
}
