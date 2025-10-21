import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../component/chat/ChatItem";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helper/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (!content) return;
     if (!inputRef.current) return;
    inputRef.current.value = "";
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (err) {
      toast.error("Failed to send message");
      console.log(err);
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    const loadChats = async () => {
      if (auth?.isLoggedIn && auth.user) {
        toast.loading("Loading Chats", { id: "loadchats" });
        try {
          const data = await getUserChats();
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        } catch (err) {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        }
      }
    };
    loadChats();
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) navigate("/login");
  }, [auth, navigate]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#0d1117",
        color: "#e6edf3",
        p: { xs: 1, md: 2 },
        gap: 2,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          flex: 0.25,
          flexDirection: "column",
          bgcolor: "#161b22",
          borderRadius: "16px",
          p: 3,
          boxShadow: "0 0 10px rgba(255,255,255,0.05)",
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            my: 2,
            bgcolor: "#00ffa3",
            color: "#0d1117",
            fontWeight: 700,
            width: "70px",
            height: "70px",
            fontSize: "24px",
            boxShadow: "0 0 20px rgba(0,255,163,0.4)",
          }}
        >
          {auth?.user?.name[0]}
        </Avatar>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.2rem",
            mb: 2,
          }}
        >
          Chat Assistant
        </Typography>
<Typography
  sx={{
    mx: "auto",
    fontFamily: "Work Sans",
    mt: 3,
    mb: 2,
    p: 1,
    fontSize: "15px",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  }}
>
  Ask questions about Knowledge, Business, Advice, or Education.
</Typography>

<Box
  sx={{
    flex: 1,
    overflowY: "auto",
    mt: 1,
    p: 1,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  }}
>
  <Typography
    sx={{
      fontSize: "14px",
      color: "rgba(255,255,255,0.4)",
      mb: 1,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    }}
  >
    Recent Conversations
  </Typography>

  {chatMessages.length > 0 ? (
    chatMessages
      .filter((msg) => msg.role === "user")
      .slice(-5)
      .reverse()
      .map((msg, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: "#111",
            borderRadius: "8px",
            p: 1.5,
            my: 0.8,
            cursor: "pointer",
            ":hover": { bgcolor: "#222" },
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#e2e8f0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {msg.content}
          </Typography>
        </Box>
      ))
  ) : (
    <Typography sx={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
      No recent conversations
    </Typography>
  )}
</Box>

        <Button
          onClick={handleDeleteChats}
          sx={{
            mt: "auto",
            bgcolor: red[600],
            color: "white",
            fontWeight: 700,
            borderRadius: "10px",
            ":hover": {
              bgcolor: red[800],
              transform: "scale(1.05)",
            },
            transition: "0.3s ease",
          }}
        >
          Clear Conversation
        </Button>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flex: { md: 0.75, xs: 1 },
          display: "flex",
          flexDirection: "column",
          bgcolor: "#161b22",
          borderRadius: "16px",
          p: { xs: 2, md: 3 },
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.4rem",
            color: "#00ffa3",
            fontWeight: 600,
            mb: 2,
            textShadow: "0 0 10px rgba(0,255,163,0.4)",
          }}
        >
          ChatGPT - MERN
        </Typography>

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 1,
            borderRadius: "10px",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#30363d",
              borderRadius: "10px",
            },
          }}
        >
          {chatMessages.length === 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                color: "#8b949e",
                mt: "40%",
                fontSize: "1rem",
              }}
            >
              Start chatting with your AI assistant 🤖
            </Typography>
          ) : (
            chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))
          )}
          <div ref={chatEndRef} />
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#0d1117",
            borderRadius: "30px",
            mt: 2,
            p: 1,
            border: "1px solid #30363d",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e6edf3",
              fontSize: "1rem",
              padding: "10px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              bgcolor: "#00ffa3",
              color: "#0d1117",
              borderRadius: "50%",
              ":hover": {
                bgcolor: "#00e69a",
                transform: "scale(1.1)",
              },
              transition: "0.2s ease",
              p: 1.2,
            }}
          >
            <IoMdSend size={22} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
