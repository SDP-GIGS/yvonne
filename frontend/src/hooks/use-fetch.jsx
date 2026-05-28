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

    
    if (url) {
      fetchData();
    }
  }, [url]);  //Added dependency array to re-fetch data when URL changes
  
  // Return these so components using this hook can access the data, loading state, and any errors
  return { data, loading, error };
};

export default useFetch;