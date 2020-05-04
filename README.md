# use-cloudinary

> Hooks created to wrap core cloudinary features for the client

[![NPM](https://img.shields.io/npm/v/use-cloudinary.svg)](https://www.npmjs.com/package/use-cloudinary) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-cloudinary
```

## useImage

```jsx
import { useImage } from 'use-cloudinary'

function Image({ cloudName, publicId, transforms }) {
  const { getImage, data, status, error } = useImage({ cloud_name: cloudName });

  React.useEffect(() => {
    getImage({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={data} alt="Transformed from Cloudinary" />
}
```

## useVideo

```jsx
import { useVideo } from 'use-cloudinary'

function Video({ cloudName, publicId, transforms }) {
  const { getVideo, data, status, error } = useVideo({ cloud_name: "your-cloud-name" })
  React.useEffect(() => {
    getVideo({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <video autoPlay controls>
      <source src={data} />
    </video>
  )
}
```

## useGif

```jsx
import { useGif } from 'use-cloudinary'

function Gif({ cloudName, publicId, transforms }) {
  const { getGif, data, status, error } = useGif({ cloud_name: cloudName })
  
  React.useEffect(() => {
    getGif({
      public_id: publicId, 
      transform_options: {
        ...transforms
      }
    })
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return <img src={data} alt='gif from a video'/>
}
```

## useAudio

```jsx
import { useAudio } from 'use-cloudinary';

function Audio({ cloudName, publicId, transforms }) {
  const { getAudio, data, status, error } = useAudio({ cloud_name: cloudName });
  
  React.useEffect(() => {
    getAudio({
      public_id: publicId,
      transform_options: {
        ...transforms
      }
    })
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div>
      <audio controls>
        <source src={data} type="audio/mp3" />
      </audio>
    </div>
  )
}
```

## useUpload

Example of a serverless function you'd create 
(Guide coming soon 😅)
```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

exports.handler = (event) => {
  const { public_id, file, tags, eager, type = 'auto', size } = JSON.parse(event.body);

  const res = await cloudinary.uploader.upload(file, {
    public_id,
    resource_type: type,
    tags,
    eager
  })

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}
```
```jsx
import { useUpload } from 'use-cloudinary'

function Upload({ endpoint }) {
  const { upload, data, status } = useUpload({ endpoint });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div>
      <input type="file" onChange={() => {
        // ...stuff to make sure your media is ready to upload 
        upload({
          file,
          uploadOptions 
        });
      }} />
      {data && <img src={data.url} />}
    </div>
  )
}
```

## useSearch

Example of a serverless function you'd create 
(Guide coming soon 😅)
```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const res = await cloudinary.search
    .expression(body.expression)
    .execute().then(result => result);
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}
```
```jsx
import Image from './Image';
import { useSearch } from 'use-cloudinary';

// Here's an example of getting all the images in your account 
export default function Images({ endpoint }) {
  const { search, data, status } = useSearch({ endpoint: endpoint });

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => search({
        expression: "resource_type:image"
      })}>
        Load
      </button>
      <div>
        {
          data && data.resources.map(image => (
            <Image publicId={image.public_id} transforms={{ height: 0.2, border: "2px_solid_black" }} />
          )}
      </div>
    </div >
  )
}
```


## License

MIT © [domitriusclark](https://github.com/domitriusclark)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
