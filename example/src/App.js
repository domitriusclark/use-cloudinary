import React from 'react';
import { useImage } from 'use-cloudinary';

export default function App() {
  const { generateImageUrl } = useImage("mdnextjs");

  const config = {
    delivery: {
      publicId: "mdnext-logo"
    },
    transformation: [
      { height: 0.3 },
      { fetchFormat: "auto", quality: "auto" }
    ]
  }

  return <img src={generateImageUrl(config)} />
}