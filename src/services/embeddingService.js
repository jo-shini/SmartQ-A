const { OpenAIEmbeddings } = require("@langchain/openai");

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY
});

exports.getEmbedding = async (text) => {
    return await embeddings.embedQuery(text);
}