import Technology from "./Technology";
import Screenshot from "./Screenshot";

export default interface Project {
  id: string;
  title: string;
  technologies: Technology[];
  type: "frontend" | "backend" | "fullstack";
  isAdaptive: boolean;
  deployUrl: string;
  sourceCodeUrl: string;
  previewImage: Screenshot;
  updatedAt: string;
  createdAt: string;
}
