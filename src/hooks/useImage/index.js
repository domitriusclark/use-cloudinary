import * as React from 'react';
import { useQuery } from 'react-query'
import cloudinary from 'cloudinary-core'

export default function useImage({ cloudName } = {}) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })

  if (!cloudName) {
    throw new Error("Must enter a cloud name")
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
      (transform_options.hasOwnProperty('width') || transform_options.hasOwnProperty('height'))
      && !transform_options.hasOwnProperty('crop')) {
      transform_options.crop = 'scale';
    }

    // Attach { fetchFormat: 'auto' } automatically when no config is supplied. This will deliver the best image format automatically depending on your browser
    if (!transform_options.hasOwnProperty('fetchFormat')) {
      transform_options.fetchFormat = 'auto';
    }

    // Attach { quality: 'auto' } automatically when no config is supplied
    if (!transform_options.hasOwnProperty('quality')) {
      transform_options.quality = 'auto';
    }

    return setImageOptions({ publicId, transformations });
  }

  return { generateUrl, url, status, error }
}
