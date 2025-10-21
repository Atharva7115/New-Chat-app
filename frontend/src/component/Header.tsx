import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header: React.FC = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "#0a0a0a",
        position: "static",
        boxShadow: "0 0 20px #00fffc",
        borderBottom: "2px solid #2c3333ff",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          padding: "10px 20px",
          alignItems: "center",
        }}
      >
        <Logo />

        <div style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="#0f172a"
                sxHover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 15px #00fffc",
                }}
              />
              <NavigationLink
                bg="#51538f"
                textColor="#e2e8f0"
                to="/"
                text="Logout"
                onClick={auth.logout}
                sxHover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 15px #00fffc",
                }}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="#0f172a"
                sxHover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 15px #00fffc",
                }}
              />
              <NavigationLink
                bg="#51538f"
                textColor="#e2e8f0"
                to="/signup"
                text="Signup"
                sxHover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 15px #00fffc",
                }}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


