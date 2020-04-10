import React from 'react'
import { useImage } from 'use-cloudinary'

const App = () => {
  const [cloudinary, status, error] = useImage({ cloud_name: 'testing-hooks-upload' })

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>{error.message}</p>
  return (
    <div>
      <img src={cloudinary.getImage({
        image_name: 'testing'
      })} />
    </div>
  )
}
export default App
