# PersonaAI-Frontend

A Next.js frontend for the PersonaAI project. Built with TypeScript and styled using CSS.
This platform provides a chat interface for AI-driven persona conversations using pre-defined Personas (e.g., _Hitesh Sir_ and _Piyush Sir_ personas) and integrates with AI models to have simulate styled, personality-based conversations.

## 💻 Live Link

Try it out : https://persona-ai-frontend-alpha.vercel.app/

## Tech Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **Styles**: Tailwind CSS
---

## 🧱 Project Structure

```bash

PersonaAI-Frontend/
├── app/               # Next.js app directory (routes/pages)
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Library or utility functions
├── public/            # Static assets (images, icons, etc.)
├── styles/            # Global and component-specific CSS
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

## ⚙️ Getting Started

**Prerequisites**  
- Node.js  
- Package manager: npm | yarn | pnpm | bun

**Install dependencies**  
```bash
#Clone the repo

cd PersonaAI-Frontend

npm install
# or
yarn install
# or
pnpm install
# or
bun install

touch .env

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


#Access it via http://localhost:3000.
```

## 🔧 Environment Variables

Your .env file directory should include:

```bash
NEXT_PUBLIC_API_URL = your-backend-url
```

## 🧠 Credits

Built by Sarvesh Kulkarni as an assignment project as part of ChaiCode GenAI with JS Cohort.

## 📄 License

MIT License
