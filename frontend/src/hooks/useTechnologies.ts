import { useState, useEffect } from "react";
import { stringify } from "qs-esm";
import axios from "axios";
import { Technology } from "../interfaces";

const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const queryParams = stringify({ limit: 0 }, { addQueryPrefix: true, encode: true });

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/technologies${queryParams}`);

        setTechnologies(data.docs);
      } catch (error) {
        setError("Failed to fetch technologies");

        console.error("Error while getting technologies:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { technologies, isLoading, error };
};

export default useTechnologies;
