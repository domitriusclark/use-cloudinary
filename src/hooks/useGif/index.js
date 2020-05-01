import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useGif({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })

  const [gifOptions, setGifOptions] = React.useState({
    public_id: '',
    transform_options: {}
  });

  const { data, status, error } = useQuery(gifOptions && [`${gifOptions.public_id}-url`, gifOptions], async (key, gifOptions) => {
    const gif = cld.video_url(`${gifOptions.public_id}.gif`, {
      ...gifOptions.transform_options,
      flags: "animated",
      fetchFormat: "auto",
      effect: "loop",
    })
    return gif;
  })

  function getGif({ public_id, transform_options }) {
    return setGifOptions({ public_id, transform_options })
  }

  return { getGif, data, status, error }

}
