import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useSearch({ endpoint } = {}) {
  if (!endpoint) {
    throw new Error("Must provide an endpoint to search");
  }

  const [search, { data, status, error }] = useMutation(async (searchConfig) => {
    /*
      search by: 
        - public ID by name or by prefix --> folder/imagePublicId | publicId | (prefix search w/) publicId*
        - resource type --> can only be image or video (strictly)
        - folder --> (returns an exact folder..no subfolders) test/sample | (any path that contains "sample") sample
        - tags --> (space your tags out) "each word is a different tag" 
        - aspect ratio --> (string of your aspect ratio) "16:9"

      To do this, we'll need to check for the key, and crate a template string
      that we can send and place directly inside of our backend search query 

      --> search expects a structure like so `expression: 'resource_type:image AND tags="whatever tags you have"'
     */
    let expressionConfig = '';
    if (searchConfig.hasOwnProperty('publicId')) {
      if (expressionConfig.split.length === 0) {
        return expressionConfig + `AND public_id=${publicId}`;
      } else {
        return `public_id=${publicId}`
      }

    }

    if (searchConfig.hasOwnProperty('resourceType')) {
      if (expressionConfig.split.length === 0) {
        return expressionConfig + `AND resource_type:${resourceType}`;
      } else {
        return `resource_type:${resourceType}`
      }
    }


    if (searchConfig.hasoOwnProperty('folder')) {
      if (expressionConfig.split.length === 0) {
        return expressionConfig + `AND folder:${folder}`
      } else {
        return `folder:${folder}`
      }
    }

    if (searchConfig.hasOwnProperty('tags')) {
      if (expressionConfig.split.length === 0) {
        return expressionConfig + `AND tags="${tags}"`;
      } else {
        return `tags=${tags}`
      }
    }

    if (searchConfig.hasOwnProperty('aspectRatio')) {
      if (expressionConfig.split.length === 0) {
        return expressionConfig + `AND aspect_ratio="${aspectRatio}"`;
      } else {
        return `aspect_ratio="${aspectRatio}"`
      }
    }

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        expression: expressionConfig
      })
    });

    return res.json();
  });

  return { search, data, status, error }
} 