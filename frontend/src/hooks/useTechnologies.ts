import { useState, useEffect } from "react";
import axios from "axios";
import { Technology } from "../interfaces/Technology";

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/technologies`);

        setTechnologies(data.docs);
      } catch (err) {
        setError("Failed to fetch technologies");

        console.error("Error while getting technologies:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { technologies, isLoading, error };
};
