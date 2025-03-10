import { Box, Chip, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, List, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Toolbar, Typography, useTheme } from "@mui/material";
import { FC, ChangeEvent } from "react";
import { useTechnologies } from "../../../hooks/useTechnologies";
import { Technology } from "../../../interfaces/Technology";
import { Filters } from "../../../interfaces/Filters";

interface DrawerComponentProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const DrawerComponent: FC<DrawerComponentProps> = ({ filters, setFilters }) => {
  const { technologies, isLoading } = useTechnologies();
  const theme = useTheme();

  const handleTechnologyClick = (technologyId: string) => {
    const isTechnologySelected = filters.technologies.some(({ id }) => id === technologyId);
    const newTechnologies = isTechnologySelected ? filters.technologies.filter(({ id }) => id !== technologyId) : [...filters.technologies, technologies.find(({ id }) => id === technologyId)!];

    setFilters({ ...filters, technologies: newTechnologies });
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => setFilters({ ...filters, type: event.target.value });

  const handleAdaptiveChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFilters({
      ...filters,
      isAdaptive: event.target.value === "true" ? true : event.target.value === "false" ? false : null,
    });

  return (
    <Box sx={{ paddingX: 2 }}>
      <Toolbar />

      <Divider sx={{ marginBottom: 2 }} />

      <Typography variant="h6" noWrap sx={{ marginBottom: 2 }}>
        Filters
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Typography sx={{ marginBottom: 1, color: "text.secondary" }}>Technologies</Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}>
          {technologies.map((technology: Technology) => (
            <Chip key={technology.id} icon={<img alt={technology.title} src={`${process.env.REACT_APP_BASE_URL}${technology.url}`} style={{ width: 20, height: 20 }} />} label={technology.title} onClick={() => handleTechnologyClick(technology.id)} color={filters.technologies.some(({ id }) => id === technology.id) ? "primary" : "default"} variant="outlined" clickable sx={{ backgroundColor: filters.technologies.some(({ id }) => id === technology.id) ? theme.palette.text.secondary : undefined, borderRadius: 2 }} />
          ))}
        </List>
      )}

      <Divider sx={{ marginBottom: 2 }} />

      <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">Is Adaptive</FormLabel>
        <RadioGroup value={filters.isAdaptive ?? ""} name="adaptive-group" onChange={handleAdaptiveChange} aria-label="adaptive">
          <FormControlLabel value="" control={<Radio />} label="All" />
          <FormControlLabel value="true" control={<Radio />} label="With" />
          <FormControlLabel value="false" control={<Radio />} label="Without" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ marginBottom: 3 }} />

      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select labelId="type-label" value={filters.type} onChange={handleTypeChange} label="Type">
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="frontend">Frontend</MenuItem>
          <MenuItem value="backend">Backend</MenuItem>
          <MenuItem value="fullstack">Fullstack</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DrawerComponent;
