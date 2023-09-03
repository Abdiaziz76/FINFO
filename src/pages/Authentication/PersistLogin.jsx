import React, { useEffect, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const verifyRefreshToken = async () => {
    try {
      await refresh();
    } catch (error) {
      console.error(error);
      toast.error("Error verifying refresh token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth?.accessToken]);

  return (
    <>
      {isLoading
        ? 'Loading...'
        : <Outlet />
      }
    </>
  );
};

export default PersistLogin;
