import * as React from 'react';
import { useQuery } from 'react-query';
import cloudinary from 'cloudinary-core'

export default function useVideo({ cloud_name }) {
  const cld = cloudinary.Cloudinary.new({ cloud_name })

  const [videoOptions, setVideoOptions] = React.useState({
    public_id: '',
    transform_options: {}
  });

  const { data, status, error } = useQuery(videoOptions && [`${videoOptions.public_id}-url`, videoOptions], async (key, videoOptions) => {
    const video = cld.video_url(videoOptions.public_id, {
      ...videoOptions.transform_options
    });

    return video;
  })

  function getVideo({ public_id, transform_options }) {
    return setVideoOptions({ public_id, transform_options });
  }

  return [getVideo, data, status, error]

}
