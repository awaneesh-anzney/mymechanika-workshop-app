# MyMechanika Workshop App

A modern workshop management application built with Next.js 15, designed to streamline workshop operations.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
mymechanika-workshop-app/
├── public/                  # Static assets like images and fonts
├── src/
│   ├── app/                 # Next.js App Router (pages & layouts)
│   │   ├── (work-shop)/     # Workshop specific routes group
│   │   ├── globals.css      # Global styles & Tailwind imports
│   │   ├── layout.tsx       # Root application layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Authentication related components
│   │   ├── common/          # Shared components (Header, Sidebar, etc.)
│   │   ├── dashboard/       # Dashboard specific widgets/views
│   │   ├── providers/       # Global providers (Theme, QueryClient, etc.)
│   │   └── ui/              # Reusable UI primitives (Button, Input, etc.)
│   ├── lib/                 # Utilities, helpers, and configurations
│   ├── store/               # Global state management (Zustand stores)
│   ├── types/               # TypeScript interfaces and types
│   └── middleware.ts        # Middleware for auth/routing protection
├── .gitignore               # Git ignore rules
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Documentation

- **Auth System:** See `AUTH_SYSTEM.md`
- **RBAC:** See `RBAC_DOCUMENTATION.md` and `RBAC_SUMMARY.md`
- **NestJS Integration:** See `NESTJS_INTEGRATION.md`
