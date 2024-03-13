import { useEffect, useRef, useState } from "react";
import { HTTPMethod } from "./useFetch.types";

export const DEFAULT_OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjZlZWJkZTQ3NzUwZmI1NzE0NGJhN2ZjZmI4NWEyNiIsInN1YiI6IjYwMmNiYTM0YzY2OWFkMDA0MGRmZGFkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nUfm3PNnb_eXRDTxhH5dJqG65-0c670yT30BMMJ7SR0",
  },
};

const useFetch = (
  url: string,
  method: HTTPMethod = "GET",
  skipFirstRender = false
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (skipFirstRender && isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setLoading(true);
    fetch(url, { ...DEFAULT_OPTIONS, method })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
    setLoading(false);
  }, [url, method, skipFirstRender]);

  const refetch = (urlS: string) => {
    setLoading(true);
    fetch(urlS, { ...DEFAULT_OPTIONS, method })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
    setLoading(false);
  };
  return { data, loading, error, refetch };
};

export default useFetch;
