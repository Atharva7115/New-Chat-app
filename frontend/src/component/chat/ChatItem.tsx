import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type MessageBlock = {
  content: string;
  isCode: boolean;
};

type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};

// Parse message to detect code blocks between ```
function parseMessage(message: string): MessageBlock[] {
  const parts = message.split(/```/);
  return parts.map((block: string, index: number) => ({
    content: block.trim(),
    isCode: index % 2 === 1,
  }));
}

const ChatItem = ({ content, role }: ChatItemProps) => {
  const auth = useAuth();
  const blocks = parseMessage(content);
  const isUser = role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        mb: 3,
        gap: 2,
        flexDirection: isUser ? "row-reverse" : "row",
        animation: "fadeIn 0.4s ease",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor: isUser ? "#00fffc" : "#111",
          color: isUser ? "#0f172a" : "#00fffc",
          fontWeight: 600,
          fontSize: "16px",
          border: isUser ? "2px solid #00fffc" : "2px solid #333",
          boxShadow: "0 0 10px rgba(0,255,252,0.2)",
        }}
      >
        {!isUser ? (
          <img
            src="/openai.png"
            alt="openai"
            width={28}
            height={28}
            style={{
              filter: "invert(100%)",
              borderRadius: "50%",
            }}
          />
        ) : (
          auth?.user?.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")
        )}
      </Avatar>

      {/* Message Bubbles */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          maxWidth: "80%",
        }}
      >
        {blocks.map((block: MessageBlock, index: number) =>
          block.isCode ? (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language="javascript"
              customStyle={{
                borderRadius: "12px",
                marginTop: "8px",
                fontSize: "14px",
                background: "#0f172a",
                boxShadow: "0 0 15px rgba(0,255,252,0.05)",
              }}
            >
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <Typography
              key={index}
              sx={{
                bgcolor: isUser
                  ? "linear-gradient(135deg, #00fffc33, #00fffc11)"
                  : "linear-gradient(135deg, #1a1a1a, #0f172a)",
                color: "#e2e8f0",
                fontSize: "16px",
                px: 2,
                py: 1.5,
                borderRadius: isUser
                  ? "18px 18px 0 18px"
                  : "18px 18px 18px 0",
                whiteSpace: "pre-wrap",
                lineHeight: 1.5,
                boxShadow: isUser
                  ? "0 0 12px rgba(0,255,252,0.1)"
                  : "0 0 12px rgba(255,255,255,0.05)",
                border: isUser
                  ? "1px solid rgba(0,255,252,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.3s ease",
              }}
            >
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;


