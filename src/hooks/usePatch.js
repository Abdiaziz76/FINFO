import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const patchData = async (url, data) => {
    setIsLoading(true);

    try {
      const response = await axiosPrivate.patch(url, data);
      console.log('resp', response);
      // Handle the response if needed
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { patchData, isLoading, error };
};

export default usePatch;
