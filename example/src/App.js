import React from 'react'
import { useImage, useVideo, useGif, useAudio } from 'use-cloudinary'

function Audio({ publicId, transforms }) {
  const [getAudio, data, status, error] = useAudio({ cloud_name: "testing-hooks-upload" });
  React.useEffect(() => {
    getAudio({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(data);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <p>Hello</p>
}

function Image({ publicId, transforms }) {
  const [getImage, data, status, error] = useImage({ cloud_name: "testing-hooks-upload" });
  React.useEffect(() => {
    getImage({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={data} alt="Transformed from Cloudinary" />
}

function Video({ publicId, transforms }) {
  const [getVideo, data, status, error] = useVideo({ cloud_name: "testing-hooks-upload" })
  React.useEffect(() => {
    getVideo({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <video autoPlay controls>
      <source src={data} />
    </video>
  )
}

function Gif({ publicId, transforms }) {
  const [getGif, data, status, error] = useGif({ cloud_name: "testing-hooks-upload" })
  React.useEffect(() => {
    getGif({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={data} alt="gif from a video" />
}

const App = () => {
  return (
    <div>
      <Audio publicId="game-sounds/switch" />
      <Image publicId="test toasts" transforms={{ height: 0.3, crop: 'scale' }} />
      <Gif publicId="trees" transforms={{ height: 0.3, crop: 'scale' }} />
      <Video publicId="gif test" transforms={{ height: 0.3, crop: 'scale' }} />
    </div>
  )
}
export default App
