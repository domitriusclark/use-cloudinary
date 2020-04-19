import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useUpload({ endpoint }) {
  const [upload, { data: uploadedImage, status: uploadStatus, error: uploadError }] = useMutation(async ({ file, uploadOptions }) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        eager: uploadOptions.eager || {},
        tags: [...uploadOptions.tags],
        public_id: uploadOptions.public_id,
        file
      })
    })

    return res.json()
  }, {
    refetchOnWindowFocus: false
  })

  const cloudinaryObject = {
    upload,
    createSocialTemplate
  }

  return [cloudinaryObject, uploadedImage, uploadStatus, uploadError]
}