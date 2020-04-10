# use-cloudinary

> Hooks created to wrap core cloudinary features for the client

[![NPM](https://img.shields.io/npm/v/use-cloudinary.svg)](https://www.npmjs.com/package/use-cloudinary) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-cloudinary
```

## useImage's getImage

```jsx
import React from 'react'

import { useImage } from 'use-cloudinary'

const Example = () => {
  const [cloudinary, images, status, error] = useImage({ cloud_name: "your-cloudinary-cloud-name"});

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={cloudinary.getImage({
    public_id: "the-images-public-id",
    transform_options: {
      width: 200,
      height: 200
    }
  })}>
}
```

## useImage's getImagesByTag

```jsx
import React from 'react'

import { useImage } from 'use-cloudinary'

function Example() {
  const [cloudinary, images, status] = useCloudinaryImage({ cloud_name: "your-cloud-name" });

  // Feed a specified tag from your library to pull all images
  const [input, setInput] = React.useState();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <input onChange={e => setInput(e.target.value)} />
      <button onClick={() => cloudinary.getImagesByTag(input)}>Search</button>
      {images && images.resources.map(i =>
        <img src={cloudinary.getImage(
          {
            image_name: i.public_id,
            transform_options: {
              width: 400,
              height: 400
            }
          }
        )} />
      )}
    </div>
}
```

## useUpload

```jsx
import React from 'react'

import { useImage, useUpload } from 'use-cloudinary'

const Example = () => {
  const [cloudinary] = useImage({ cloud_name: "your-cloud-name" }) 
  const [upload, data, status] = useUpload({ endpoint: "/your/serverless/endpoint" });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div>
      <input type="file" onChange={() => {
        // ...stuff to make sure your media is ready to upload to cloudinary
        upload({
          file,
          uploadOptions 
        });
      }} />
      {
        // once your image is uploaded, feed it to useImage's getImage 
        data && <img src={cloudinary.getImage({
          public_id: data.public_id
      })} />}
    </div>
  )
}
```

## License

MIT © [domitriusclark](https://github.com/domitriusclark)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
