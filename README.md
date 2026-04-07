Smart Q&A API (RAG-Based Backend System)
 
---
 
Overview
 
This project implements a Smart Question-Answering API using:
 
- Node.js + Express (Backend)
- MongoDB (Document store)
- Groq LLM (Answer generation)
 
It follows a Retrieval-Augmented Generation (RAG) approach to ensure that all answers are:
 
- ✅ Context-aware
- ✅ Grounded in data
- ✅ Structured and reliable
 
---
 
 What This System Does
 
When a user asks a question:
 
1.  The system receives the query via API
2.  Relevant documents are retrieved from the database
3.  Context is constructed from those documents
4.  LLM generates an answer strictly based on context
5.  A structured JSON response is returned
 
---
 
 RAG Pipeline (Core Logic)
 
1 Retrieval Layer
 
- Fetches documents from MongoDB
- Uses weighted keyword matching:
  - "tags" → highest priority
  - "title" → medium priority
  - "content" → base priority
 
 Ensures most relevant documents are selected
 
---
 
2️ Context Construction
 
- Top matching documents are combined
- Forms a single context input for LLM
 
---
 
3️ LLM Generation (Groq)
 
- Context + Question → sent to LLM
- Prompt enforces:
  - No hallucination
  - Answer only from context
  - Strict JSON output
 
---
 
4️ Structured Output
 
{
  "answer": "string",
  "sources": ["document_id"],
  "confidence": "high | medium | low"
}
 
---
 
 Confidence Calculation
 
Confidence is derived from retrieval score, not LLM:
 
- High → Strong match
- Medium → Partial match
- Low → Weak match
 
 Ensures deterministic and reliable results
 
---
 
 Authentication
 
- Users can:
  - Register → "/api/auth/register"
  - Login → "/api/auth/login"
- JWT token is issued on login
 
Protected endpoints require:
 
Authorization: Bearer <token>
 
---
 
 Rate Limiting
 
- Limit: 10 requests/minute per user
- Prevents abuse of LLM usage
- Implemented using "express-rate-limit"
 
---
 
 Logging (Observability)
 
Each "/api/ask" request logs:
 
- userId
- question (trimmed)
- latency (ms)
- confidence
 
 Helps in monitoring and debugging
 
---
 
 Error Handling
 
- Centralized error handler
- Clean API responses
- No internal stack traces exposed
 
---
 
 Project Architecture
 
src/
│
├── controllers/       # Handles request/response
├── services/          # Business logic (RAG, LLM)
├── models/            # MongoDB schemas
├── routes/            # API endpoints
├── middleware/        # Auth, rate limit, error handler
├── utils/             # Logger
├── scripts/           # Seed script
└── app.js             # Entry point
 
---
 
 Setup Instructions
 
1️ Clone Repository
 
git clone https://github.com/jo-shini/SmartQ-A.git
cd SmartQ-A
 
---
 
2️ Install Dependencies
 
npm install
 
---
 
3️ Environment Variables
 
Create ".env" file:
 
MONGO_URI=mongodb://127.0.0.1:27017/smartqa
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
PORT=3000

---
 
4️ Seed Sample Data
 
npm run seed
 
---
 
5️ Run Server
 
npm run dev
 
Server runs at:
 
http://localhost:3000
 
---
 
 API Endpoints
 
 Authentication
 
Register
 
POST /api/auth/register
 
Login
 
POST /api/auth/login
 
---
 
 Documents
 
GET /api/docs
 
---
 
 Ask Question (Protected)
 
POST /api/ask
 
Headers:
 
Authorization: Bearer <token>
 
Body:
 
{
  "question": "What is the refund policy?"
}
 
---
 
Sample cURL
 
curl -X POST http://localhost:3000/api/ask \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"question":"What is refund policy?"}'
 
---
 
 Design Decisions
 
Why RAG?
 
To ensure answers are grounded in data and avoid hallucination.
 
---

 Future Improvements
 
- Add vector embeddings for semantic search
- Use Redis for distributed rate limiting
- Add caching layer
- Dockerize the application
 
---
 
 Evaluation Coverage
 
- ✔ RAG pipeline
- ✔ Structured LLM output
- ✔ Auth + rate limiting
- ✔ Logging & error handling
- ✔ Clean architecture
 
 