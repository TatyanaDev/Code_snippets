import { Card, CardContent, CardMedia, Typography, Link, Chip, List, Box } from "@mui/material";
import { FC } from "react";
import { Project } from "../../../interfaces";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => (
  <Card sx={{ height: "calc(100% - 32px)", m: 2 }}>
    <CardMedia component="img" height="250" image={project.previewImage.url} alt={project.previewImage.alt} />

    <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
      <Typography gutterBottom variant="h5" component="div">
        {project.title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: 1 }}>
        <Typography variant="body2">
          <Link href={project.deployUrl} target="_blank" rel="noopener" sx={{ display: "flex", alignItems: "center", columnGap: 0.5 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Live Demo
          </Link>
        </Typography>

        <Typography variant="body2">
          <Link href={project.sourceCodeUrl} target="_blank" rel="noopener" sx={{ display: "flex", alignItems: "center", columnGap: 0.5 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-external-link">
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
            Source Code
          </Link>
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" component="div">
        Technologies:
        <List sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {project.technologies.map((technology) => (
            <Chip key={technology.id} icon={<img alt={technology.title} src={technology.url} style={{ width: 20, height: 20 }} />} label={technology.title} variant="outlined" sx={{ borderRadius: 2 }} />
          ))}
        </List>
      </Typography>
    </CardContent>
  </Card>
);

export default ProjectCard;
