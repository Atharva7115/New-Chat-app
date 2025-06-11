// src/config/openai-config.ts
import OpenAI from "openai";
export const configureOpenAI = () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPEN_AI_SECRET is not defined");
    }
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION, // Make sure this env var is spelled correctly
    });
};
//# sourceMappingURL=openai-config.js.map