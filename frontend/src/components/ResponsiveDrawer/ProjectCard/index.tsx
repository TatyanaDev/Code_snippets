import { Card, CardContent, CardMedia, Typography, Link, Chip, List, Box } from "@mui/material";
import { Project } from "../../../interfaces/Project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <Card
    sx={{
      m: 2,
      height: "calc(100% - 32px)",
    }}
  >
    <CardMedia component="img" height="250" image={`${process.env.REACT_APP_BASE_URL}${project.previewImage.url}`} alt={project.previewImage.alt} />

    <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
      <Typography gutterBottom variant="h5" component="div">
        {project.title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: 1 }}>
        <Typography variant="body2">
          <Link href={project.deployUrl} target="_blank" rel="noopener">
            View Deploy
          </Link>
        </Typography>

        <Typography variant="body2">
          <Link href={project.sourceCodeUrl} target="_blank" rel="noopener">
            Source Code
          </Link>
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" component="div">
        Technologies:
        <List sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {project.technologies.map((technology) => (
            <Chip
              key={technology.id}
              icon={<img alt={technology.title} src={`${process.env.REACT_APP_BASE_URL}${technology.url}`} style={{ width: 20, height: 20 }} />}
              label={technology.title}
              variant="outlined"
              sx={{
                borderRadius: 2,
              }}
            />
          ))}
        </List>
      </Typography>
    </CardContent>
  </Card>
);

export default ProjectCard;
