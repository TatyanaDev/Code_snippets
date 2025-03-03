import { useState, ChangeEvent } from "react";
import { CssBaseline, IconButton, Typography, Toolbar, AppBar, Drawer, Box, ThemeProvider, createTheme, Grid2 as Grid, CircularProgress, Pagination } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useProjects } from "../../hooks/useProjects";
import DrawerComponent from "./DrawerComponent";
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
});

const ResponsiveDrawer = () => {
  const { projects, isLoading, currentPage, setCurrentPage, totalPages } = useProjects(12);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

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

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dev Sketches by Tatyana Karpenko
            </Typography>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="filters">
          <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} onClose={handleDrawerClose} sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }} slotProps={{ root: { keepMounted: true } }}>
            <DrawerComponent />
          </Drawer>

          <Drawer variant="permanent" sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }} open>
            <DrawerComponent />
          </Drawer>
        </Box>

        <Box component="main" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, justifyContent: "space-between", flexDirection: "column", minHeight: "100vh", display: "flex", flexGrow: 1, p: 3 }}>
          <Toolbar />

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 112px)" }}>
              <CircularProgress />
            </Box>
          ) : (
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
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResponsiveDrawer;
