import TRANSFORM_OPTIONS from './constants';

const createCloudinaryUrl = (cloudName, assetType) => ({
  config = {},
  delivery,
  transformation
}) => {

  const fullConfig = {
    ...config,
    cloud: {
      ...config.cloud,
      cloudName
    },
    url: {
      ...config.url,
      secure: true
    }
  };

  function normalizeTransforms(transforms) {
    const newTransforms = [];
    Object.keys(TRANSFORM_OPTIONS).map((option) =>
      Object.keys(transforms).map((t) => {
        if (option === t) {
          newTransforms.push(`${TRANSFORM_OPTIONS[option]}${transforms[t]}`);
        }
      })
    );

    return newTransforms.join();
  }

  const prefix = getUrlPrefix(fullConfig.cloud.cloudName);
  const storageType = handleStorageType(delivery);
  const signature = delivery.signature;
  const transformationString = transformation
    ? normalizeTransforms(transformation)
    : "";
  const version = getUrlVersion(fullConfig.url, delivery);
  const publicId = delivery.publicId;

  const url = [
    prefix,
    assetType,
    storageType,
    signature,
    transformationString,
    version,
    publicId
  ]
    .filter((a) => a)
    .join("/")
    .replace(" ", "%20");

  return url;
};

function isFileName(publicId) {
  return publicId.indexOf("/") < 0;
}

function isUrl(publicId) {
  return publicId.match(/^https?:\//);
}

function publicIdContainsVersion(publicId) {
  return publicId.match(/^v[0-9]+/);
}

function getUrlPrefix(cloudName) {
  // defaults
  const protocol = "http://";
  const cdnPart = "";
  const subdomain = "res";
  const host = ".cloudinary.com";
  const path = `/${cloudName}`;

  return [protocol, cdnPart, subdomain, host, path].join("");
}

function handleStorageType(delivery) {
  //default to upload
  if (!delivery || !delivery.storageType) {
    return "upload";
  }

  return delivery.storageType;
}

function getUrlVersion(urlConfig = true, delivery) {
  const shouldForceVersion = urlConfig.forceVersion !== false;

  if (delivery.version) {
    return `v${delivery.version}`;
  }

  // In all these conditions we never force a version
  if (
    publicIdContainsVersion(delivery.publicId) ||
    isUrl(delivery.publicId) ||
    isFileName(delivery.publicId)
  ) {
    return "";
  }

  return shouldForceVersion ? "v1" : "";
}

export default createCloudinaryUrl;