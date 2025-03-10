import Technology from "./Technology";

export default interface Filters {
  isAdaptive: boolean | null;
  technologies: Technology[];
  type: string;
}
