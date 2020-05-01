import { useMutation } from 'react-query';
import fetch from 'isomorphic-unfetch';

export default function useSearch({ endpoint } = {}) {
  if (!endpoint) {
    throw new Error("Must provide an endpoint to search");
  }

  const [search, { data, status, error }] = useMutation(async (searchBody) => {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        ...searchBody
      })
    });

    return res.json();
  });

  return { search, data, status, error }
} 