import React from 'react';
import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useSearch({ endpoint } = {}) {
  if (!endpoint) {
    throw new Error("Must provide an endpoint to search");
  }

  let expressionConfig = "";

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

      you will now call search from the client structured like this --> needs at least one of the following, but can include all/multiple

      search({
        publicId: "your-public-id"
        resourceType: "image || video"
        folder: "test/sample"
        tags: "tag1 tag2"
        aspectRatio: "16:9"
      })

  */

  const [search, { data, status, error }] = useMutation(async (searchConfig) => {
    if (searchConfig.hasOwnProperty('publicId')) {
      if (expressionConfig.trim().length === 0) {
        expressionConfig = `public_id=${searchConfig.publicId}`
      } else {
        expressionConfig + ` AND public_id=${searchConfig.publicId}`;
      }
    }

    if (searchConfig.hasOwnProperty('resourceType')) {
      if (expressionConfig.trim().length === 0) {
        console.log("I'm running in resourceType")
        expressionConfig`resource_type:${searchConfig.resourceType}`

      } else {
        expressionConfig + ` AND resource_type:${searchConfig.resourceType}`
      }
    }

    if (searchConfig.hasOwnProperty('folder')) {
      if (expressionConfig.trim().length === 0) {
        expressionConfig = `folder:${searchConfig.folder}`
      } else {
        expressionConfig` AND folder:${searchConfig.folder}`;
      }
    }

    if (searchConfig.hasOwnProperty('tags')) {
      if (expressionConfig.trim().length === 0) {
        console.log("I ran inside of tags")
        expressionConfig = `tags=${searchConfig.tags}`
      } else {
        expressionConfig + ` AND folder:${searchConfig.tags}`;
      }
    }

    if (searchConfig.hasOwnProperty('aspectRatio')) {
      if (expressionConfig.trim().length === 0) {
        expressionConfig = `aspect_ratio="${searchConfig.aspectRatio}"`
      } else {
        expressionConfig + ` AND aspect_ratio="${searchConfig.aspectRatio}"`;
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