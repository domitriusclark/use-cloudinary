import { useMutation } from 'react-query';

export default function useSearch({ endpoint }) {
  const [search, { data, status, error }] = useMutation(async (searchBody) => {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        ...searchBody
      })
    });

    return res.json();
  });

  return [search, data, status, error]
} 