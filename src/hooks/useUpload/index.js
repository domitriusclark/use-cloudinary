import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useUpload({ endpoint } = {}) {
  if (!endpoint) {
    throw new Error("Must provide an endpoint to upload")
  }

  const [upload, { data, status, error }] = useMutation(async ({ file, uploadOptions }) => {
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
  })


  return { upload, data, status, error }
}