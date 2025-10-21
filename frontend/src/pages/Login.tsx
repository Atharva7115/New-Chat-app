import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, Divider } from "@mui/material";
import CustomizedInput from "../component/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) navigate("/chat");
  }, [auth, navigate]);

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#0a0a0a"
      color="#e2e8f0"
      fontFamily="'Roboto Slab', serif"
      p={2}
    >
      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px",
          background: "rgba(30,30,30,0.95)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,255,252,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          color="#00fffc"
          letterSpacing={1}
          mb={2}
        >
          Welcome Back
        </Typography>

        <Divider sx={{ borderColor: "#00fffc", opacity: 0.3 }} />

        {/* Inputs */}
        <CustomizedInput
          type="email"
          name="email"
          label="Email"
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "#111111",
              color: "#e2e8f0",
              "& fieldset": { borderColor: "#00fffc" },
              "&:hover fieldset": { borderColor: "#00fffccc" },
            },
            "& .MuiInputLabel-root": { color: "#94a3b8" },
          }}
        />
        <CustomizedInput
          type="password"
          name="password"
          label="Password"
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "#111111",
              color: "#e2e8f0",
              "& fieldset": { borderColor: "#00fffc" },
              "&:hover fieldset": { borderColor: "#00fffccc" },
            },
            "& .MuiInputLabel-root": { color: "#94a3b8" },
          }}
        />

        {/* Login Button */}
        <Button
          type="submit"
          sx={{
            py: 1.5,
            borderRadius: 3,
            bgcolor: "#00fffc",
            color: "#0f172a",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "16px",
            transition: "all 0.3s ease",
            ":hover": {
              bgcolor: "#0f172a",
              color: "#00fffc",
              boxShadow: "0 0 20px #00fffc",
            },
          }}
          endIcon={<IoIosLogIn />}
        >
          Login
        </Button>

        <Divider sx={{ borderColor: "#00fffc", opacity: 0.3 }} />

        <Typography textAlign="center" color="#94a3b8">
          Don’t have an account?{" "}
          <Button
            onClick={() => navigate("/signup")}
            sx={{
              color: "#00fffc",
              textTransform: "none",
              fontWeight: 600,
              ":hover": { color: "#0f172a" },
            }}
          >
            Sign Up
          </Button>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;

