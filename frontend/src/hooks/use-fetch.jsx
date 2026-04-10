import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.message ||'An error occurred');
      } finally {
        setLoading(false);
        
      }
    };

    fetchData();
  }, [url]);  //It re-runs if the URL changes

  return { data, loading, error };
};

export default useFetch;