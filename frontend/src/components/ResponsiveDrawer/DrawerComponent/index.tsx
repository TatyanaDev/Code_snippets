import { useState } from "react";
import { Avatar, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Box, Typography, Divider, Toolbar, List, useTheme } from "@mui/material";

const DrawerComponent = () => {
  const [selectedTechs, setSelectedTechs] = useState<number[]>([]);
  const theme = useTheme();

  const technologies = [
    { id: 1, name: "Java", iconUrl: "/path/to/java-icon.png" },
    { id: 2, name: "Python", iconUrl: "/path/to/python-icon.png" },
    { id: 3, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 4, name: "Java", iconUrl: "/path/to/csharp-icon.png" },
    { id: 5, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 6, name: "Python#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 7, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 8, name: "Java", iconUrl: "/path/to/csharp-icon.png" },
    { id: 9, name: "Python#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 10, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 11, name: "Java", iconUrl: "/path/to/csharp-icon.png" },
    { id: 12, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 13, name: "Python#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 14, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 15, name: "Java", iconUrl: "/path/to/csharp-icon.png" },
    { id: 16, name: "C#", iconUrl: "/path/to/csharp-icon.png" },
    { id: 17, name: "Kotlin", iconUrl: "/path/to/kotlin-icon.png" },
  ];

  const handleTechClick = (id: number): void =>
    setSelectedTechs((prev) => {
      const currentIndex = prev.indexOf(id);
      const newSelected = [...prev];

      if (currentIndex === -1) {
        newSelected.push(id);
      } else {
        newSelected.splice(currentIndex, 1);
      }

      return newSelected;
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

      <List sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}>
        {technologies.map((technology) => (
          <Chip
            key={technology.id}
            avatar={<Avatar alt={technology.name} src={technology.iconUrl} />}
            label={technology.name}
            onClick={() => handleTechClick(technology.id)}
            color={selectedTechs.includes(technology.id) ? "primary" : "default"}
            variant="outlined"
            clickable
            sx={{
              backgroundColor: selectedTechs.includes(technology.id) ? theme.palette.text.secondary : undefined,
              borderRadius: 2,
            }}
          />
        ))}
      </List>

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
