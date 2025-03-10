import { Technology } from "./Technology";

export interface Filters {
  isAdaptive: boolean | null;
  technologies: Technology[];
  type: string;
}
