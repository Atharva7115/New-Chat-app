import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <img
          src="openai.png"
          alt="openai"
          width={"40px"}
          height={"40px"}
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontWeight: "800",
          fontSize: "24px",
          color: "#00fffc",
          textShadow: "0 0 10px rgba(0, 255, 252, 0.3)",
        }}
      >
        MERN-GPT
      </Typography>
    </div>
  );
};

export default Logo;
