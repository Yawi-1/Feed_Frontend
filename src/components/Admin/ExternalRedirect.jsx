import { useEffect } from "react";

const ExternalRedirect = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return null; // or a loading message
};

export default ExternalRedirect;
