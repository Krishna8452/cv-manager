import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import { Theme } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import image from "../../constants/image";

export default function SideNav() {
  const location = useLocation();

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const { collapsed, toggled } = useProSidebar();

  const theme = useTheme();

  return (
    <Sidebar
      style={{ height: "100%", top: "auto", backgroundColor: "#f44336" }}
      breakPoint="md"
    >
      <Box sx={styles.avatarContainer}>
        <Avatar sx={styles.avatar} alt="Channel Name" src={image.images4} />
        {!collapsed ? (
          <Typography variant="body2" sx={styles.yourChannel}>
            Amnil Technologies
          </Typography>
        ) : null}
        {!collapsed ? (
          <Typography variant="oveline">CV Management</Typography>
        ) : null}
      </Box>
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? "white" : undefined,
            };
          },
        }}
      >
        <MenuItem
          active={location.pathname === "/dashboard"}
          component={<Link to="/dashboard" />}
          icon={<DashboardIcon />}
        >
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>

        <MenuItem
          active={location.pathname === "/applicant" ||location.pathname === '/applicant/create'||location.pathname === '/applicant/edit/:id'}
          component={<Link to="/applicant" />}
          icon={<PersonIcon />}
        >
          <Typography variant="body2">Applicant</Typography>
        </MenuItem>

        {/* <MenuItem active={location.pathname === '/experienceApplicants' }
          component={<Link to="/experienceApplicants"/>}
          icon={<AccountCircleIcon/>}
        >
          <Typography variant="body2">Experienced Applicant</Typography>
        </MenuItem>

        <MenuItem active={location.pathname === '/experience'}
          component={<Link to="/experience"/>}
          icon={<AccountCircleIcon/>}
        >
          <Typography variant="body2">Experience</Typography>
        </MenuItem> */}

        <MenuItem
          active={location.pathname === "/interviewer" || location.pathname==="/interviewer/create"}
          component={<Link to="/interviewer" />}
          icon={<ManageAccountsIcon />}
        >
          <Typography variant="body2">Interviewer</Typography>
        </MenuItem>

        <MenuItem
          active={location.pathname === "/interview" || location.pathname==="/interview/create"}
          component={<Link to="/interview" />}
          icon={<InterpreterModeIcon />}
        >
        <Typography variant="body2">Interview</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/offerLetter" || location.pathname==="/offerLetter/create"}
          component={<Link to="/offerLetter" />}
          icon={<EmailIcon />}
        >
        <Typography variant="body2">Offer Letter</Typography>
        </MenuItem>

        <MenuItem
          active={location.pathname === "/assessmentTest" || location.pathname==="/assessmentTest/create"}
          component={<Link to="/assessmentTest" />}
          icon={<AssessmentIcon />}
        >
          <Typography variant="body2">Assessment Test</Typography>
        </MenuItem>


        <MenuItem icon={<LogoutIcon />} onClick={handleSignOut}>
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

/**@type {import("@mui/material").SxProps} */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "40%",
    height: "auto",
  },
  yourChannel: {
    mt: 1,
  },
};
