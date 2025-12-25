import { useState, useEffect } from "react";
import { stringify } from "qs-esm";
import axios from "axios";
import { Filters, Project } from "../interfaces";

interface Condition {
  [key: string]: {
    equals: string;
  };
}

interface QueryFilters {
  isAdaptive?: {
    equals: string | boolean;
  };
  type?: {
    equals: string;
  };
  and?: Condition[];
}

const useProjects = (filters: Filters) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const techFilters = filters.technologies.map(({ id }) => ({ technologies: { equals: id } }));

      const query: QueryFilters = {
        isAdaptive: filters.isAdaptive !== null ? { equals: filters.isAdaptive.toString() } : undefined,
        type: filters.type !== "All" ? { equals: filters.type } : undefined,
        ...(techFilters.length > 0 && { and: techFilters }),
      };

      (Object.keys(query) as Array<keyof QueryFilters>).forEach((key) => {
        if (query[key] === undefined) {
          delete query[key];
        }
      });

      const queryParams = stringify({ where: query, limit: 0 }, { addQueryPrefix: true, encode: true });

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects${queryParams}`);

        setProjects(data.docs);
      } catch (error) {
        setError("Failed to fetch projects");

        console.error("Error while getting projects:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filters]);

  return { projects, isLoading, error };
};

export default useProjects;
