# use-cloudinary

> Hooks created to wrap core cloudinary features for the client

[![NPM](https://img.shields.io/npm/v/use-cloudinary.svg)](https://www.npmjs.com/package/use-cloudinary) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-cloudinary
```

## useMedia's getImage

```jsx
import React from 'react'

import { useMedia } from 'use-cloudinary'

const Example = () => {
  const [{ getImage }] = useMedia({ cloud_name: "your-cloudinary-cloud-name"});

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={getImage({
    public_id: "the-images-public-id",
    transform_options: {
      width: 200,
      height: 200
    }
  })}>
}
```

## useMedia's getVideo

```jsx
import React from 'react'

import { useMedia } from 'use-cloudinary'

const Example = () => {
  const [{ getVideo }] = useMedia({ cloud_name: "your-cloudinary-cloud-name"});

  return 
    <>
      <video autoPlay>
        <source src={getVideo({
          public_id: "the-videos-public-id",
          transform_options: {
            width: 500,
            height: 300,
            crop: 'scale'
          }})} 
        />
      </video>
}
```

## useMedia's getImagesByTag

```jsx
import React from 'react'

import { useMedia } from 'use-cloudinary'

function Example() {
  const [{ getImagesByTag, getImage }, images, status, error] = useMedia({ cloud_name: "your-cloud-name" });

  // Feed a specified tag from your library to pull all images
  const [input, setInput] = React.useState();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div>
      <input onChange={e => setInput(e.target.value)} />
      <button onClick={() => getImagesByTag(input)}>Search</button>
      {images && images.resources.map(i =>
        <img src={getImage(
          {
            public_id: i.public_id,
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

import { useMedia, useUpload } from 'use-cloudinary'

const Example = () => {
  const [{ getImage }] = useMedia({ cloud_name: "your-cloud-name" }) 
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
        data && <img src={getImage({
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
