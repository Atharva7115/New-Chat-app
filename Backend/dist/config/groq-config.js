import Groq from "groq-sdk";
export const configureGroq = () => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("GROQ_API_KEY is not defined");
    }
    return new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
};
//# sourceMappingURL=groq-config.js.map