import { CssBaseline, IconButton, Typography, Toolbar, AppBar, Drawer, Box, ThemeProvider, createTheme, Grid2 as Grid, CircularProgress, Pagination, Tooltip, Chip, styled } from "@mui/material";
import { useState, ChangeEvent, FC } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import useProjects from "../../hooks/useProjects";
import DrawerComponent from "./DrawerComponent";
import { Filters } from "../../interfaces";
import ProjectCard from "./ProjectCard";
import StarBorder from "../StarBorder";

const drawerWidth = 280;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c4dff",
    },
    text: {
      secondary: "#b39ddb",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#424242",
          maxWidth: "340px",
          padding: "10px",
        },
      },
    },
  },
});

const ResponsiveDrawer: FC = () => {
  const [filters, setFilters] = useState<Filters>({ isAdaptive: null, technologies: [], type: "All" });
  const { projects, isLoading, currentPage, setCurrentPage, totalPages } = useProjects(12, filters);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => setCurrentPage(newPage);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const CustomTypography = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    "& span": {
      color: theme.palette.primary.main,
    },
    "& span:not(:first-of-type)": {
      color: theme.palette.text.secondary,
    },
    "& a": {
      color: theme.palette.text.secondary,
    },
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Code Snippets by Tatyana Karpenko
            </Typography>

            <Tooltip
              enterTouchDelay={0}
              arrow
              title={
                <>
                  <CustomTypography>
                    <span>Project:</span>&nbsp;Code Snippets
                  </CustomTypography>
                  <CustomTypography>
                    <span>Description:</span>&nbsp;Code Snippets is a collection of various small projects that I've worked on over time. It’s not an exhaustive showcase of my skills, but rather a practical compilation of the different tasks I’ve encountered along my learning journey.
                  </CustomTypography>
                  <CustomTypography>
                    <span>Purpose:</span>&nbsp;This project is meant to serve as a casual glimpse into the variety of challenges I've addressed as I've grown as a developer. It's a way to keep all these experiences in one accessible location, not just for showcasing but also as a personal inventory of my developmental milestones.
                  </CustomTypography>
                  <CustomTypography>
                    <span>Technology Stack:</span>&nbsp;<span>Frontend:</span>&nbsp;React, Material UI; <span>Backend:</span>&nbsp;PayloadCMS, MongoDB
                  </CustomTypography>
                  <CustomTypography>
                    <span>Source Code:</span>&nbsp;
                    <a href="https://github.com/TatyanaDev/Code_snippets" target="_blank" rel="noopener noreferrer">
                      Code Snippets Repository
                    </a>
                  </CustomTypography>
                </>
              }
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <Chip icon={<InfoIcon style={{ color: "#e0e0e0" }} />} label="Information" onClick={toggleTooltip} color={tooltipOpen ? "primary" : "default"} variant="outlined" clickable sx={{ backgroundColor: tooltipOpen ? "text.secondary" : undefined, borderRadius: 2 }} />
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="filters">
          <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} onClose={handleDrawerClose} sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }} slotProps={{ root: { keepMounted: true } }}>
            <DrawerComponent filters={filters} setFilters={setFilters} />
          </Drawer>

          <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }} open>
            <DrawerComponent filters={filters} setFilters={setFilters} />
          </Drawer>
        </Box>

        <Box component="main" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, justifyContent: "space-between", flexDirection: "column", minHeight: "100vh", display: "flex", flexGrow: 1, p: 3 }}>
          <Toolbar />

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 112px)" }}>
              <CircularProgress />
            </Box>
          ) : projects.length > 0 ? (
            <>
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: "center" }}>
                {projects.map((project) => (
                  <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <StarBorder as="div" color="#7c4dff">
                      <ProjectCard project={project} />
                    </StarBorder>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center", width: "100%" }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 112px)", textAlign: "center" }}>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No projects found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                Try adjusting your filters or resetting them to find more projects.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResponsiveDrawer;
