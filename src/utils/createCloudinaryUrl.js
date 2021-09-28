import TRANSFORM_OPTIONS from "./constants";

const createCloudinaryUrl = (cloudName, asset) => ({
  config = {},
  delivery,
  transformation = {}
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
    if (Array.isArray(transforms)) {
      return transforms
        .map((transform) => {
          return Object.entries(transform)
            .map((key) => {
              return `${TRANSFORM_OPTIONS[key[0]]}${key[1]}`;
            })
            .join(",");
        })
        .join("/");
    } else {
      Object.keys(TRANSFORM_OPTIONS).map((option) =>
        Object.keys(transforms).map((t) => {
          if (option === t) {
            newTransforms.push(`${TRANSFORM_OPTIONS[option]}${transforms[t]}`);
          }
        })
      );

      return newTransforms.join();
    }
  }

  function configureTransformations(asset, transformation) {
    switch (asset) {
      case "image":
        // Attach { crop: 'scale' } automatically when height or width options are supplied. This is to handle applying those transformations properly
        if (
          transformation.hasOwnProperty("width") ||
          (transformation.hasOwnProperty("height") &&
            !transformation.hasOwnProperty("crop"))
        ) {
          transformation.crop = "scale";
        }

        // Attach { fetchFormat: 'auto' } automatically when no config is supplied. This will deliver the best image format automatically depending on your browser
        if (!transformation.hasOwnProperty("fetchFormat" || "fetch")) {
          transformation.fetchFormat = "auto";
        }

        // Attach { quality: 'auto' } automatically when no config is supplied
        if (!transformation.hasOwnProperty("quality")) {
          transformation.quality = "auto";
        }

        return normalizeTransforms(transformation);

      case "video":
        // Attach { crop: 'scale' } automatically when height or width options are supplied. This is to handle applying those transformations properly
        if (
          (transformation.hasOwnProperty("width") ||
            transformation.hasOwnProperty("height")) &&
          !transformation.hasOwnProperty("crop")
        ) {
          transformation.crop = "scale";
        }

        // Attach { fetchFormat: 'auto' } automatically when no config is supplied. This will deliver the best image format automatically depending on your browser
        if (!transformation.hasOwnProperty("fetchFormat" || "fetch")) {
          transformation.fetchFormat = "auto";
        }

        // Attach { quality: 'auto' } automatically when no config is supplied
        if (!transformation.hasOwnProperty("quality")) {
          transformation.quality = "auto";
        }

        return normalizeTransforms(transformation);

      case "gif":
        // Attach { crop: 'scale' } automatically when height or width options are supplied. This is to handle applying those transformations properly
        if (
          (transformation.hasOwnProperty("width") ||
            transformation.hasOwnProperty("height")) &&
          !transformation.hasOwnProperty("crop")
        ) {
          transformation.crop = "scale";
        }

        // Attach { fetchFormat: 'auto' } automatically when no config is supplied. This will deliver the proper gif format automatically depending on your browser
        if (!transformation.hasOwnProperty("fetchFormat")) {
          transformation.fetchFormat = "auto";
        }

        return normalizeTransforms({
          ...transformation,
          flags: "animated",
          effect: "loop"
        });
      case "audio":
        return normalizeTransforms(transformation || "");

      default:
        return;
    }
  }

  const prefix = getUrlPrefix(fullConfig.cloud.cloudName);
  const storageType = handleStorageType(delivery);
  const signature = delivery.signature;
  const version = "v1";
  const publicId = delivery.publicId;

  const url = [
    prefix,
    handleAssetType(asset),
    storageType,
    signature,
    configureTransformations(asset, transformation),
    version,
    configurePublicId(asset, publicId)
  ]
    .filter((a) => a)
    .join("/")
    .replace(" ", "%20");

  return url;
};

function handleAssetType(asset) {
  switch (asset) {
    case "image":
      return "image";

    case "video":
      return "video";

    case "gif":
      return "video";

    case "audio":
      return "video";

    default:
      return "";
  }
}

function configurePublicId(asset, publicId) {
  switch (asset) {
    case "image":
      return publicId;

    case "video":
      return publicId;

    case "gif":
      return `${publicId}.gif`;

    case "audio":
      return `${publicId}.mp4`;

    default:
      return publicId;
  }
}

function getUrlPrefix(cloudName) {
  // defaults
  const protocol = "https://";
  const cdnPart = "";
  const subdomain = "res";
  const host = ".cloudinary.com";
  const path = `/${cloudName}`;

  return [protocol, cdnPart, subdomain, host, path].join("");
}

function handleStorageType(delivery) {
  const isUrl = (url) =>
    url.match(
      /^(ht|f)tps?:\/\/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?$/
    );

  if (isUrl(delivery.publicId)) {
    return "fetch";
  }

  //default to upload
  if (!delivery || !delivery.storageType) {
    return "upload";
  }



  return delivery.storageType;
}

export default createCloudinaryUrl;
