import React from 'react';

import { useAudio } from 'use-cloudinary';

export default function App() {
  const { generateAudioUrl } = useAudio("mdnextjs");

  return (
    <audio controls>
      <source src={generateAudioUrl({
        delivery: {
          publicId: "domitriusdotdev/switch-click"
        }
      })} />
    </audio>
  )
}