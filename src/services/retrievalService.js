const Document = require('../models/Document');

exports.findRelevantDocs = async (question) => {
    const words = question.toLowerCase().split(" ");

    const docs = await Document.find();

    const scored = docs.map(doc => {
        const content = doc.content.toLowerCase();
        const title = doc.title.toLowerCase();
        const tags = doc.tags.join(" ").toLowerCase();

        let score = 0;

        words.forEach(word => {
            if (content.includes(word)) score += 1;
            if (title.includes(word)) score += 2;  
            if (tags.includes(word)) score += 3;  
        });

        return { doc, score };
    });

    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
};
