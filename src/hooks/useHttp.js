import { useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      resData.message || 'something went wrong, failed to send request'
    );
  }
  return resData;
}

export default function useHttp() {
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  async function sendRequest() {
    setIsLoading(true);
    try {
      const redData = sendHttpRequest();
      setData(resData);
    } catch (error) {
      setError(error.message || 'something went wrong');
    }
    setIsLoading(false);
  }
  return {
    data,
    isLoading,
    error
  };
}
