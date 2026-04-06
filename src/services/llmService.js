const { ChatOpenAI } = require("@langchain/openai");

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temparature: 0
})

exports.askLLM = async (question, context) => {
    const prompt = `
    You are a strict AI assistant.

    Answer ONLY using the provided context.
    If the answer is not in the context, say: 
    "I don't know based on the given documents."
    
    Context: ${context}

    Question: ${question}

    Return ONLY valid JSON:
    {
        "answer":"...",
        "confidence":"high | meduium | low"
    }
    `;

    const response = await model.invoke(prompt);
    return response.content;
}