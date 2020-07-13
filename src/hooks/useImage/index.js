import * as React from 'react';
import { useQuery } from 'react-query'
import cloudinary from 'cloudinary-core'
import { useInView } from 'react-intersection-observer';
import useNativeLazyLoading from '@charlietango/use-native-lazy-loading';

export default function useImage({ cloudName } = {}) {
  const cld = cloudinary.Cloudinary.new({ cloud_name: cloudName }, { secure: true })
  const supportsLazyLoading = useNativeLazyLoading();
  const [ref, inView] = useInView({
    triggerOnce: true
  })

  if (!cloudName) {
    throw new Error("Please enter a valid cloud name")
  }

  function blurredPlaceholderUrl(publicId, width, height) {
    if (!width) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/e_blur:1000,q_1,f_auto/h_${height}/${publicId}.jpg`;
    } else if (!height) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width}/e_blur:1000,q_1,f_auto/${publicId}.jpg`;
    } else if (!height && !width) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/e_blur:1000,q_1,f_auto/${publicId}.jpg`;
    } else {
      return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width}/e_blur:1000,q_1,f_auto/h_${height}/${publicId}.jpg`;
    }
  }

  const [imageOptions, setImageOptions] = React.useState({
    public_id: '',
    transform_options: {}
  });

  const { data: url, isLoading, isError, isIdle, isSuccess, error } = useQuery(
    [`${imageOptions.public_id}-url`, imageOptions],
    async (key, imageOptions) => await cld.url(imageOptions.publicId, { ...imageOptions.transformations }),
    { enabled: imageOptions }
  )

  function generateUrl({ publicId, transformations } = {}) {
    if (!publicId) {
      throw new Error("Must provide a public id of your asset")
    }

    // Attach { crop: 'scale' } automatically when height or width options are supplied. This is to handle applying those transformations properly
    if (transformations.hasOwnProperty('width') || transformations.hasOwnProperty('height') && !transformations.hasOwnProperty('crop')) {
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

  return {
    generateUrl,
    blurredPlaceholderUrl,
    url,
    isLoading,
    isError,
    isIdle,
    isSuccess,
    error,
    ref,
    inView,
    supportsLazyLoading
  }
}
