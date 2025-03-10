import { useState, useEffect } from "react";
import { stringify } from "qs-esm";
import axios from "axios";
import { Project } from "../interfaces/Project";
import { Filters } from "../interfaces/Filters";

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

export const useProjects = (itemsPerPage = 12, filters: Filters) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const techFilters: Condition[] = filters.technologies.map(({ id }) => ({ technologies: { equals: id } }));

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
        setTotalPages(Math.ceil(data.docs.length / itemsPerPage));
      } catch (error) {
        setError("Failed to fetch projects");

        console.error("Error while getting projects:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [itemsPerPage, filters]);

  const paginatedProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { projects: paginatedProjects, isLoading, error, currentPage, setCurrentPage, totalPages };
};
