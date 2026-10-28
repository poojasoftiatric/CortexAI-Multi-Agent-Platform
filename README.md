# CortexAI — Autonomous Multi-Agent AI Workspace & Document RAG Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%208-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  <img src="https://img.shields.io/badge/AI%20Orchestration-LangGraph%20%7C%20LangChain-purple?style=for-the-badge" alt="LangGraph" />
  <img src="https://img.shields.io/badge/Vector%20DB-Qdrant-red?style=for-the-badge" alt="Qdrant" />
  <img src="https://img.shields.io/badge/Caching-Redis%20%28Upstash%29-critical?style=for-the-badge&logo=redis" alt="Redis" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloud%20Storage-AWS%20S3-orange?style=for-the-badge&logo=amazons3" alt="AWS S3" />
</p>

---

## 🌟 Executive Summary

**CortexAI** is a modern, enterprise-grade Generative AI workspace and multi-agent execution platform. Designed with an event-driven microservices architecture, CortexAI orchestrates specialized LLM agents for conversational reasoning, dynamic document retrieval (RAG), live code synthesis with browser sandboxing, real-time web intelligence, multi-modal vision analysis, and automated document generation (PDFs & Presentations).

---

## 🏗️ High-Level Architecture

CortexAI operates as a distributed system with a centralized **API Gateway**, autonomous **Microservices**, and a high-performance **React + Vite** client.

```
                              ┌────────────────────────┐
                              │  Frontend (React 19)   │
                              │   Port 5173 (Vite)     │
                              └───────────┬────────────┘
                                          │
                                   HTTP / Cookies
                                          │
                                          ▼
                              ┌────────────────────────┐
                              │      API Gateway       │
                              │       Port 8000        │
                              └───────────┬────────────┘
                                          │ (Protected & Proxied)
         ┌──────────────────┬─────────────┼───────────────┬──────────────────┐
         │                  │             │               │                  │
         ▼                  ▼             ▼               ▼                  ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Auth Service  │ │  Chat Service  │ │ Agent Service  │ │Billing Service│ │  Shared Redis  │
│   Port 8001    │ │   Port 8002    │ │   Port 8003    │ │   Port 8004    │ │  Upstash/Local │
└───────┬────────┘ └───────┬────────┘ └───────┬────────┘ └───────┬────────┘ └────────────────┘
        │                  │                  │                  │
        ▼                  ▼                  ▼                  ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               MongoDB Atlas Database                                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 Specialized AI Agents & Workflows

All agent workflows are coordinated by **LangGraph** state graphs with dynamic condition routing:

| Agent | Technology Stack | Functionality & Capabilities |
| :--- | :--- | :--- |
| **Intelligent Router** | LangGraph, Groq LLM | Evaluates query intent and inspected MIME types to autonomously route requests to specialized agents. |
| **PDF Document RAG** | LangChain, Qdrant, Gemini Embeddings | Parses uploaded PDFs (`pdf-parse`), chunks text (`RecursiveCharacterTextSplitter`), embeds into Qdrant Vector DB, and performs semantic retrieval for document QA. |
| **Coding Engine** | OpenRouter (DeepSeek), Monaco Editor | Classifies intent (Code Gen, Review, Debug, Optimize), outputs multi-file web projects (HTML, CSS, JS), and renders them in an interactive live browser sandbox. |
| **Web Search Agent** | Tavily Search API, Groq | Executes live web searches, synthesizes real-time knowledge, and integrates citations and web images into answers. |
| **Conversational Chat** | Groq (`gpt-oss-120b`), Redis Memory | Low-latency chat assistant with multi-turn conversational history persisted in Redis sessions. |
| **Presentation (PPT) Agent**| `pptxgenjs`, AWS S3 | Generates full multi-slide presentation decks, uploads assets to AWS S3, and serves signed download links. |
| **Document (PDF) Agent** | `pdfkit`, AWS S3 | Creates structured, styled business documents, resumes, and reports, saving directly to cloud object storage. |
| **Vision & Image Generator**| Pollinations.ai, AWS S3 | Generates realistic imagery from prompt-engineered descriptions and archives them in AWS S3. |
| **Image Analyzer** | Google Gemini 2.5 Flash | Multimodal visual OCR and diagram analysis on uploaded image attachments. |

---

## 📂 Repository Directory Structure

```text
1.cortexAI/
├── backend/
│   ├── docker-compose.yml          # Optional local Redis configuration
│   ├── package.json                # Root concurrently script managing all services
│   ├── gateway/                    # Reverse Proxy API Gateway (Port 8000)
│   │   ├── controllers/            # User profile endpoints
│   │   ├── middleware/             # Redis session validation (protect)
│   │   ├── utils/                  # Proxy routing with forwarded headers
│   │   └── index.js
│   ├── services/
│   │   ├── agent/                  # Core Agent Engine & LangGraph (Port 8003)
│   │   │   ├── agents/             # Chat, Coding, PDF RAG, PPT, Search, Vision
│   │   │   ├── config/             # Qdrant, S3, Tavily, Gemini Embeddings, Rate Limits
│   │   │   ├── graph/              # LangGraph StateGraph, Router, State Machine
│   │   │   └── index.js
│   │   ├── auth/                   # Authentication & Session Management (Port 8001)
│   │   │   ├── config/             # Firebase Admin SDK & MongoDB Connection
│   │   │   ├── controllers/        # Login, Logout, Credit Allocation & Deductions
│   │   │   └── serviceAccountKey.json
│   │   ├── billing/                # Razorpay Billing & Payments (Port 8004)
│   │   │   ├── config/             # Razorpay API client & Subscription plans
│   │   │   └── controllers/        # Order creation & HMAC signature verification
│   │   └── chat/                   # Conversation History & Persistence (Port 8002)
│   │       ├── controllers/        # Message persistence & Conversation threads
│   │       └── models/             # Conversation & Message MongoDB schemas
│   └── shared/
│       └── redis/                  # Distributed Redis client (ioredis)
│
└── frontend/                       # React 19 Client Application (Port 5173)
    ├── src/
    │   ├── components/             # Monaco Artifacts, ChatInput, MessageBubble, Billing
    │   ├── features/               # API clients (sendMessage, createConversation)
    │   ├── redux/                  # Global slices (conversationSlice, messageSlice)
    │   ├── pages/                  # Home workspace
    │   └── utils/                  # Firebase Client SDK configuration
    ├── index.html
    └── vite.config.js
```

---

## ⚙️ Prerequisites & Infrastructure

Before running the application, ensure you have:

- **Node.js**: `v18.x` or `v20.x` or higher
- **MongoDB**: A running MongoDB instance (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Redis**: A running Redis instance (Local or serverless [Upstash Redis](https://upstash.com/))
- **Qdrant**: Vector Database for PDF RAG ([Qdrant Cloud](https://cloud.qdrant.io/) or local Docker)
- **Firebase Project**: Web app credentials & Firebase Admin Private Key
- **API Keys**:
  - [Groq Console](https://console.groq.com/keys) (For Chat, Router, RAG answer generation)
  - [Google AI Studio](https://aistudio.google.com/apikey) (For Gemini Embeddings & Vision)
  - [OpenRouter](https://openrouter.ai/) (For DeepSeek Coding Agent)
  - [Tavily AI](https://tavily.com/) (For Web Search)
  - [AWS S3](https://aws.amazon.com/s3/) (Bucket credentials for generated documents/images)
  - [Razorpay](https://razorpay.com/) (Key ID & Secret for payments)

---

## 🔐 Environment Variables Configuration

### 1. Frontend: `frontend/.env`
```env
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_RAZORPAY_KEY_ID="rzp_test_..."
VITE_SERVER_URL="http://localhost:8000"
```

### 2. API Gateway: `backend/gateway/.env`
```env
PORT=8000
FRONTEND_URL="http://localhost:5173"
REDIS_URL="rediss://default:xxxxx@xxxx.upstash.io:6379"
AUTH_SERVICE="http://localhost:8001"
CHAT_SERVICE="http://localhost:8002"
AGENT_SERVICE="http://localhost:8003"
BILLING_SERVICE="http://localhost:8004"
```

### 3. Auth Service: `backend/services/auth/.env`
```env
PORT=8001
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/cortexai"
REDIS_URL="rediss://default:xxxxx@xxxx.upstash.io:6379"
```
*(Requires valid `backend/services/auth/serviceAccountKey.json`)*

### 4. Chat Service: `backend/services/chat/.env`
```env
PORT=8002
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/cortexai"
```

### 5. Billing Service: `backend/services/billing/.env`
```env
PORT=8004
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/cortexai"
AUTH_SERVICE="http://localhost:8001"
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### 6. Agent Service: `backend/services/agent/.env`
```env
PORT=8003
MONGODB_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/cortexai"
REDIS_URL="rediss://default:xxxxx@xxxx.upstash.io:6379"
AUTH_SERVICE="http://localhost:8001"
CHAT_SERVICE="http://localhost:8002"

# LLM & Search Providers
GROQ_API_KEY="gsk_..."
GOOGLE_API_KEY="AIzaSy..."
OPENROUTER_API_KEY="sk-or-..."
TAVILY_API_KEY="tvly-..."

# Cloud Object Storage (AWS S3)
AWS_REGION="ap-south-1"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_KEY="..."
AWS_BUCKET_NAME="cortexai-assets"

# Vector Database (Qdrant)
QDRANT_URL="https://your-cluster-url.qdrant.io"
QDRANT_API_KEY="your-qdrant-api-key"
```

---

## 🚀 Installation & Running the Project

### Step 1: Install Dependencies
Run `npm install` in each module directory:
```bash
# Install backend root orchestrator dependencies
cd backend && npm install

# Install gateway dependencies
cd gateway && npm install

# Install services dependencies
cd ../services/auth && npm install
cd ../chat && npm install
cd ../agent && npm install
cd ../billing && npm install

# Install frontend dependencies
cd ../../../frontend && npm install
```

### Step 2: Start All Backend Services (Single Command)
The root `backend/package.json` uses `concurrently` to launch all 5 microservices in one unified terminal with colored labels:
```bash
cd backend
npm run dev
```

You should see:
```text
[gateway] gateway started at 8000 (redis connected)
[auth]    auth started at 8001    (redis connected, db connected)
[chat]    chat started at 8002    (db connected)
[agent]   agent started at 8003   (redis connected, db connected)
[billing] billing started at 8004 (db connected)
```

### Step 3: Start the Frontend Application
In a separate terminal, launch Vite dev server:
```bash
cd frontend
npm run dev
```

Navigate to **`http://localhost:5173`** in your browser.

---

## 📡 API Routing & Endpoints Reference

All client requests are directed to the **API Gateway** (`http://localhost:8000`), which validates authentication and proxies traffic:

| Route | Target Microservice | Description | Protection |
| :--- | :--- | :--- | :--- |
| `POST /api/auth/login` | Auth Service (8001) | Authenticates Firebase ID Token, mints Redis session | Public |
| `GET /api/auth/logout` | Auth Service (8001) | Terminates Redis session cookie | Public |
| `GET /api/me` | API Gateway (8000) | Retrieves current logged-in user context | Protected |
| `GET /api/chat/get-conversations` | Chat Service (8002) | Fetches conversation threads for user | Protected |
| `POST /api/chat/save-message` | Chat Service (8002) | Appends user/assistant messages | Protected |
| `POST /api/agent` | Agent Service (8003) | Dispatches user prompt & attachments through LangGraph | Protected |
| `POST /api/billing/create` | Billing Service (8004)| Initializes Razorpay checkout order | Protected |
| `POST /api/billing/verify` | Billing Service (8004)| Verifies payment signature & grants credits | Protected |

---

## 🛡️ Security, Rate Limiting & Quotas

- **Sliding-Window Rate Limiting**: Built using Redis atomic counters (`INCR` & `EXPIRE`) to enforce per-agent RPM limits (e.g. Chat: 20 req/min, Coding/PDF/Vision: 5 req/min).
- **Session Protection**: State sessions are stored with unique UUIDs in Redis with `httpOnly`, `sameSite: strict` cookies, preventing XSS-based token theft.
- **Credit Metering**: Each execution automatically deducts balance credits from the user's MongoDB account based on agent computation cost.

---

## 🤝 Contributing & License

Contributions, issue reports, and pull requests are welcome!

Distributed under the **ISC License**. Developed as an advanced Generative AI & Microservices demonstration project.
