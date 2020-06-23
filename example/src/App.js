import React from 'react'
import { useImage, useVideo, useGif, useAudio } from 'use-cloudinary'

function Audio({ publicId, transformations }) {
  const { generateUrl, url, status, error } = useAudio({ cloudName: "testing-hooks-upload" });

  React.useEffect(() => {
    generateUrl({ publicId, transformations })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div>
      <audio controls>
        <source src={url} type="audio/mp3" />
      </audio>
    </div>
  )
}

function Image({ publicId, transformations }) {
  const { generateUrl, url, status, error } = useImage({ cloudName: "testing-hooks-upload" });

  React.useEffect(() => {
    generateUrl({ publicId, transformations })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={url} alt="Transformed from Cloudinary" />
}

function Video({ publicId, transformations }) {
  const { generateUrl, url, status, error } = useVideo({ cloudName: "testing-hooks-upload" })
  React.useEffect(() => {
    generateUrl({ publicId, transformations })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <video autoPlay controls>
      <source src={url} />
    </video>
  )
}

function Gif({ publicId, transformations }) {
  const { generateUrl, url, status, error } = useGif({ cloudName: "testing-hooks-upload" })
  React.useEffect(() => {
    generateUrl({ publicId, transformations })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={url} alt="gif from a video" />
}

const App = () => {
  return (
    <div>
      <Audio publicId="game-sounds/switch" />
      <Image publicId="test toasts" transformations={{ height: 0.3 }} />
      <Gif publicId="trees" transformations={{ height: 0.3 }} />
      <Video publicId="trees" transformations={{ height: 0.3 }} />
    </div>
  )
}
export default App
