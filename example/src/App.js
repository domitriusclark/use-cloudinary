import React from 'react'
import { useMedia } from 'use-cloudinary'

const App = () => {
  const [{ getImage }, status, error] = useMedia({ cloud_name: 'your-cloud-name' });

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>{error.message}</p>

  return (
    <div>
      <img src={getImage({
        public_id: 'media-public-id'
      })} />
    </div>
  )
}
export default App
