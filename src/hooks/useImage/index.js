import * as React from 'react';
import { useQuery } from 'react-query'
import cloudinary from 'cloudinary-core'

export default function useImage({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })

  const [imageOptions, setImageOptions] = React.useState({
    public_id: '',
    transform_options: {}
  });

  const { data, status, error } = useQuery(imageOptions && [`${imageOptions.public_id}-url`, imageOptions], async (key, imageOptions) => {
    const image = await cld.url(imageOptions.public_id, {
      ...imageOptions.transform_options
    });

    return image
  })

  function getImage({ public_id, transform_options }) {
    return setImageOptions({ public_id, transform_options });
  }

  return [getImage, data, status, error]

}
