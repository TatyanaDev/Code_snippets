import { Box, Chip, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, List, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography, useTheme } from "@mui/material";
import { FC, ChangeEvent } from "react";
import useTechnologies from "../../../hooks/useTechnologies";
import { Technology, Filters } from "../../../interfaces";

interface DrawerComponentProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  search: string;
  setSearch: (value: string) => void;
}

const DrawerComponent: FC<DrawerComponentProps> = ({ filters, setFilters, search, setSearch }) => {
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
      <Box component="form" noValidate autoComplete="off" role="search" sx={{ marginTop: 2 }}>
        <TextField id="search-projects" label="Search" variant="outlined" value={search} onChange={({ target }) => setSearch(target.value)} fullWidth />
      </Box>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="h6" noWrap>
        Filters
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      <Typography sx={{ marginBottom: 1, color: "text.secondary" }}>Technologies</Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {technologies.map((technology: Technology) => (
            <Chip key={technology.id} icon={<img alt={technology.title} src={technology.url} style={{ width: 20 }} />} label={technology.title} onClick={() => handleTechnologyClick(technology.id)} color={filters.technologies.some(({ id }) => id === technology.id) ? "primary" : "default"} variant="outlined" clickable sx={{ backgroundColor: filters.technologies.some(({ id }) => id === technology.id) ? theme.palette.text.secondary : undefined, borderRadius: 2 }} />
          ))}
        </List>
      )}

      <Divider sx={{ marginBottom: 2, marginTop: 1 }} />

      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">Is Adaptive</FormLabel>
        <RadioGroup value={filters.isAdaptive ?? ""} name="adaptive-group" onChange={handleAdaptiveChange} aria-label="adaptive">
          <FormControlLabel value="" control={<Radio />} label="All" />
          <FormControlLabel value="true" control={<Radio />} label="With" />
          <FormControlLabel value="false" control={<Radio />} label="Without" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ marginBottom: 2, marginTop: 1 }} />

      <FormControl sx={{ marginBottom: 2 }} fullWidth>
        <InputLabel id="type-label" htmlFor="type-select">
          Type
        </InputLabel>
        <Select id="type-select" name="type" labelId="type-label" value={filters.type} onChange={handleTypeChange} label="Type">
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
