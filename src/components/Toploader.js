import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useLocation } from "react-router-dom";

const TopLoader = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.start();
    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 500); // adjust based on your UX

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LoadingBar
      ref={ref}
      color="#29d"
      height={3}
      shadow={true}
    />
  );
};

export default TopLoader;
