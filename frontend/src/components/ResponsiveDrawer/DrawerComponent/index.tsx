import { useState } from "react";
import { Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Box, Typography, Divider, Toolbar, List, useTheme, CircularProgress } from "@mui/material";
import { handleTechClick } from "../../../utils/handleTechClick";
import { useTechnologies } from "../../../hooks/useTechnologies";

const DrawerComponent = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const { technologies, isLoading } = useTechnologies();
  const theme = useTheme();

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
          {technologies.map((technology) => (
            <Chip key={technology.id} icon={<img alt={technology.title} src={`${process.env.REACT_APP_BASE_URL}${technology.url}`} style={{ width: 20, height: 20 }} />} label={technology.title} onClick={() => handleTechClick(technology.id, selectedTechnologies, setSelectedTechnologies)} color={selectedTechnologies.includes(technology.id) ? "primary" : "default"} variant="outlined" clickable sx={{ backgroundColor: selectedTechnologies.includes(technology.id) ? theme.palette.text.secondary : undefined, borderRadius: 2 }} />
          ))}
        </List>
      )}

      <Divider sx={{ marginBottom: 2 }} />

      <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">Is Adaptive</FormLabel>
        <RadioGroup defaultValue="without" name="adaptive-group" aria-label="adaptive">
          <FormControlLabel value="with" control={<Radio />} label="With" />
          <FormControlLabel value="without" control={<Radio />} label="Without" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ marginBottom: 3 }} />

      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select labelId="type-label" defaultValue="All" label="Type">
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Frontend">Frontend</MenuItem>
          <MenuItem value="Backend">Backend</MenuItem>
          <MenuItem value="Fullstack">Fullstack</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DrawerComponent;
