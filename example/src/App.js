import React from 'react'
import { useImage, useVideo, useGif, useAudio, useCloudinary } from 'use-cloudinary'

function Audio({ publicId, transformations }) {
  const { generateUrl, url, isLoading, isError, isIdle, error } = useAudio({ cloudName: "testing-hooks-upload" });

  React.useEffect(() => {
    generateUrl({ publicId, transformations })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId])

  if (isIdle || isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <audio controls>
        <source src={url} type="audio/mp3" />
      </audio>
    </div>
  )
}

function Image({ publicId, transformations, width = "auto", height, cloudName }) {
  const {
    generateUrl,
    blurredPlaceholderUrl,
    url,
    isError,
    error,
    ref,
    supportsLazyLoading,
    inView
  } = useImage({ cloudName });

  const { cld } = useCloudinary({ cloudName });

  React.useEffect(() => {
    generateUrl({
      publicId,
      transformations: {
        width,
        height,
        ...transformations
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId.transformations]);

  if (isError) return <p>{error.message}</p>;

  cld.responsive();

  return (
    <div
      ref={!supportsLazyLoading ? ref : undefined}
      style={{
        width: '100%',
        height: `${height}px`,
        background: `no-repeat url(${blurredPlaceholderUrl({ publicId, width, height })})`,
      }}>
      {inView || supportsLazyLoading ? (
        <img
          className="cld-responsive"
          data-src={url}
          loading="lazy"
          alt="Lazy loaded"
        />
      ) : null}
    </div>
  )
}

function Video({ publicId, transformations }) {
  const { generateUrl, url, isLoading, isError, error } = useVideo({ cloudName: "testing-hooks-upload" })
  React.useEffect(() => {
    generateUrl({ publicId, transformations })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Audio cloudName="testing-hooks-upload" publicId="game-sounds/switch" transformations={{ responsive: "true", dpr: "auto" }} />
      <Image cloudName="testing-hooks-upload" publicId="test toasts" transformations={{ responsive: "true", dpr: "auto" }} />
      <Image cloudName="testing-hooks-upload" publicId="test toasts" width="500" height="500" transformations={{ responsive: "true", dpr: "auto" }} />
      <Image cloudName="testing-hooks-upload" publicId="anime-commission-1" transformations={{ responsive: "true", dpr: "auto" }} />
      <Image cloudName="testing-hooks-upload" publicId="og-image_1_c2xx6n" width="500" height="500" transformations={{ responsive: "true", dpr: "auto" }} />
      <Gif publicId="trees" transformations={{ height: 0.3 }} />
      <Video publicId="trees" transformations={{ height: 0.3 }} />
    </div>
  )
}
export default App
