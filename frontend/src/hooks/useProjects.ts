import { useState, useEffect } from "react";
import axios from "axios";
import { Project } from "../interfaces/Project";

export const useProjects = (itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects?limit=0`);

        setProjects(data.docs);
        setTotalPages(Math.ceil(data.docs.length / itemsPerPage));
      } catch (err) {
        setError("Failed to fetch projects");

        console.error("Error while getting projects:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [itemsPerPage]);

  const paginatedProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { projects: paginatedProjects, isLoading, error, currentPage, setCurrentPage, totalPages };
};
