import { Dispatch, SetStateAction } from "react";

export const handleTechClick = (id: string, selectedTechnologies: string[], setSelectedTechnologies: Dispatch<SetStateAction<string[]>>): void => {
  const currentIndex = selectedTechnologies.indexOf(id);
  const newTech = [...selectedTechnologies];

  if (currentIndex === -1) {
    newTech.push(id);
  } else {
    newTech.splice(currentIndex, 1);
  }

  setSelectedTechnologies(newTech);
};
