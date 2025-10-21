import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Talk to Your Personalized AI 🤖", 
        1500,
        "Powered by Groq API ⚡",          
        2000,
        "Build Smart Conversations 💬",    
        1500,
      
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "2px 2px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;

