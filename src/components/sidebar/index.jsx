import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faArrowLeft,
  faArrowRight,
  faHamburger,
  faListCheck,
  faCheck,
  faSpinner,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import AddTaskDialog from "../addTaskDialog";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  background: "#0f172a",
}));

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const navigation = [
    { routeName: "All Tasks", routePath: "", icon: faListCheck },
    { routeName: "Completed Tasks", routePath: "completed", icon: faCheck },
    { routeName: "Pending Tasks", routePath: "pending", icon: faSpinner },
    { routeName: "Important Tasks", routePath: "important", icon: faStar },
  ];
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [addTaskOpen, setAddTaskOpen] = React.useState(false);
  const handleClickOpen = (scrollType) => () => {
    setAddTaskOpen(true);
  };

  return (
    <Box sx={{ display: "flex", background: "", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: "#0f172a",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <FontAwesomeIcon icon={faHamburger} style={{ color: "#FFF" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {!open && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  paddingLeft: "0.5rem",
                  color: "#FFF",
                }}
              >
                To-Do App
              </Typography>
            )}
            <Typography>
              {new Date().getDate() +
                "/" +
                (new Date().getMonth() + 1) +
                "/" +
                new Date().getFullYear()}
            </Typography>
            <Button
              sx={{
                color: "#FFF",
                display: "flex",
                columnGap: "0.5rem",
                alignItems: "center",
                border: "none",
                background: "#5b21b6",
                padding: "0.6rem 1rem",
                borderRadius: "0.5rem",
                "&:hover": {
                  background: "#5b21b6",
                  color: "#FFF",
                },
              }}
              onClick={handleClickOpen("paper")}
            >
              <FontAwesomeIcon icon={faAdd} />
              Add new task
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ "& .MuiPaper-root": { background: "#141e33" } }}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              paddingLeft: "0.5rem",
              color: "#FFF",
            }}
          >
            To-Do App
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <FontAwesomeIcon icon={faArrowRight} style={{ color: "#FFF" }} />
            ) : (
              <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#FFF" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {navigation?.map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(text?.routePath)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={text?.icon}
                    style={{ color: "#FFF" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={text?.routeName}
                  sx={{ opacity: open ? 1 : 0, color: "#FFF" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          background: "",
          width: "100%",
          marginTop: "4rem",
        }}
      >
        {children}
      </Box>
      {addTaskOpen && (
        <AddTaskDialog
          formType="add"
          open={addTaskOpen}
          setOpen={setAddTaskOpen}
        />
      )}
    </Box>
  );
};

export default Sidebar;
