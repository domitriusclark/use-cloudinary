import cloudinary from 'cloudinary-core'

export default function useCloudinary({ cloud_name } = {}) {
  const cld = cloudinary.Cloudinary.new({ cloud_name });

  return { cld };
}