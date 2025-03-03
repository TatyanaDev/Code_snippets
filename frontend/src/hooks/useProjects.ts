import { useState, useEffect } from "react";
import axios from "axios";
import { Project } from "../interfaces/Project";

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects`);

        setProjects(data.docs);
      } catch (err) {
        setError("Failed to fetch projects");

        console.error("Error while getting projects:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { projects, isLoading, error };
};
