import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useUpload({ endpoint } = {}, type = "signed") {
  if (!endpoint) {
    throw new Error("Must provide an endpoint to upload")
  }

  const [upload, { data, isIdle, isSuccess, isLoading, isError, error }] = useMutation(async ({ file, uploadOptions }) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        eager: uploadOptions.eager || {},
        tags: [...uploadOptions.tags],
        public_id: uploadOptions.public_id,
        type,
        uploadPreset: uploadOptions.uploadPreset || "",
        file
      })
    })

    return res.json()
  });

  return { upload, data, isIdle, isSuccess, isLoading, isError, error }
}