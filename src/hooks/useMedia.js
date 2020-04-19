import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useMedia({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })
  let cloudinaryObject

  const [tag, setTag] = React.useState()

  // This request only fires when getImagesbyTag is called
  const { data: taggedImageData, status, error } = useQuery(tag && ['images', tag], async (key, tag) => {
    /*

     To enable the list type you must:
      1. Go to your account Settings
      2. Click Security
      3. Inside 'Restricted media types' uncheck 'Resource list'

    */
    const url = await cld.url(`${tag}.json`, { type: 'list' })
    const images = await fetch(url)
    return images.json()
  })

  function getImage({ public_id, transform_options }) {
    return cld.url(public_id, { ...transform_options, crop: 'scale' })
  }

  function getVideo({ public_id, transform_options }) {
    return cld.video_url(public_id, { ...transform_options })
  }

  function getImagesByTag(tagName) {
    return setTag(tagName)
  }

  cloudinaryObject = {
    getImage,
    getVideo,
    getImagesByTag,
  }

  return [cloudinaryObject, taggedImageData, status, error]

}
