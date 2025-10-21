import { Box, Typography } from "@mui/material";
import TypingAnim from "../component/typer/TypingAnim";
import Footer from "../component/footer/Footer";
import NavigationLink from "../component/shared/NavigationLink";

const Home = () => {
  return (
    <Box
      sx={{
        background: "radial-gradient(circle at top, #0f2027, #081016 70%)",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(90deg, #00fffc, #00c6ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Chat with AI. Learn. Create. Explore.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TypingAnim />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "#ccc",
            maxWidth: "700px",
            mb: 6,
            fontSize: "1.1rem",
          }}
        >
          Your intelligent chatbot powered by OpenAI — designed to answer,
          assist, and inspire you. Built for conversations that feel natural,
          creative, and human-like.
        </Typography>

         <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Start Chatting"
                textColor="#0f172a"
                sxHover={{
                  transform: "scale(1.05)",
                  boxShadow: "0 0 15px #00fffc",
                }}
              />

      </Box>

      {/* Image Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          mx: "auto",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0,255,252,0.3)",
          border: "2px solid rgba(0,255,252,0.4)",
          my: 8,
          transition: "all 0.4s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 0 20px rgba(0,255,252,0.5)",
          },
        }}
      >
        <img
          src="image.png"
          alt="AI Chatbot Demo"
          style={{ width: "100%", borderRadius: "25px" }}
        />
      </Box>

      {/* Icons / Partner Logos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          mb: 6,
          flexWrap: "wrap",
        }}
      >
       
      </Box>

      <Footer />

      {/* Hover Effects */}
      <style>
        {`
          .hover-img:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px #00fffc);
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
