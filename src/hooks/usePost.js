import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePost = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  
  const postData = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosPrivate.post(url, data);
      console.log('resp', response);
      // Handle the response if needed
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, isLoading, error };
};

export default usePost;
