# Financy

Financy is a personal finance management application that helps users track their income and expenses. Users can categorize transactions, view financial summaries, and manage their financial data through an intuitive web interface.

## Application Overview

Financy allows users to:
- Register and authenticate securely
- Add, edit, and delete financial transactions
- Create and manage custom transaction categories with icons and colors
- View financial summaries and analytics on a dashboard
- Track income vs expenses over time
- Filter and paginate through transaction history

## Architecture

The application follows a modern full-stack architecture with a clear separation between frontend and backend:

```
├── frontend/     # React-based client application
├── backend/      # GraphQL API server
```

---

## Frontend

The frontend is built with modern React and provides a responsive, interactive user experience.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **Apollo Client v4** | GraphQL data fetching |
| **Zustand** | Lightweight state management |
| **Zod** | Schema validation |
| **Lucide React** | Icon library |

### Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Core UI components (Button, Input, Modal, etc.)
│   │   ├── layout/     # Layout components (Navbar, AppLayout)
│   │   ├── dashboard/  # Dashboard-specific components
│   │   ├── transactions/ # Transaction components
│   │   └── categories/ # Category management components
│   ├── pages/          # Route-level page components
│   ├── hooks/          # Custom React hooks
│   ├── stores/         # Zustand state stores
│   ├── graphql/        # GraphQL queries and mutations
│   ├── lib/            # Utility functions and constants
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── package.json
```

### Key Features

- **Authentication Flow**: Login and registration with JWT token storage
- **Dashboard**: Summary cards showing total income, expenses, and balance
- **Transaction Management**: Full CRUD operations with filtering and pagination
- **Categories**: Custom categories with color and icon selection
- **Responsive Design**: Works on desktop and mobile devices

---

## Backend

The backend provides a GraphQL API built with TypeScript and modern Node.js patterns.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **TypeScript** | Type-safe development |
| **Express 5** | Web framework |
| **Apollo Server 5** | GraphQL server |
| **TypeGraphQL** | Decorator-based GraphQL schema |
| **Prisma ORM** | Database ORM and migrations |
| **PostgreSQL** | Primary database |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **TypeDI** | Dependency injection |

### Project Structure

```
backend/
├── src/
│   ├── graphql/
│   │   ├── resolvers/  # GraphQL resolvers (Auth, User, Category, Transaction)
│   │   ├── models/     # TypeGraphQL models
│   │   ├── inputs/     # Input types for mutations
│   │   ├── outputs/    # Output types for responses
│   │   └── context.ts  # GraphQL context with auth
│   ├── services/       # Business logic layer
│   ├── middleware/     # Express middleware (auth)
│   ├── utils/          # Utility functions (hash, jwt, errors)
│   ├── config/         # Environment configuration
│   ├── lib/            # Database client setup
│   └── generated/      # Prisma generated client
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

### Database Schema

The application uses PostgreSQL with three main entities:

- **Users**: Authentication and profile data
- **Categories**: User-defined transaction categories with icons and colors
- **Transactions**: Financial records linked to users and categories

---

## Local Development Setup

### Prerequisites

- Node.js 20+ and pnpm
- PostgreSQL database
- Git

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/financy"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=4000
   ```

4. **Run database migrations:**
   ```bash
   pnpm prisma:migrate
   ```

5. **Generate Prisma client:**
   ```bash
   pnpm prisma:generate
   ```

6. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The GraphQL API will be available at `http://localhost:4000/graphql`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

### Default Ports

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:4000/graphql |

---

## Available Scripts

### Backend

```bash
pnpm dev              # Start development server with hot reload
pnpm prisma:migrate   # Run database migrations
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:studio    # Open Prisma Studio (database GUI)
pnpm biome:check      # Run linter
pnpm biome:format     # Format and fix linting issues
```

### Frontend

```bash
pnpm dev              # Start development server
pnpm lint             # Run ESLint
pnpm preview          # Preview production build
```

---

## API Documentation

The GraphQL API is self-documenting via the GraphQL Playground, available at `http://localhost:4000/graphql` when running the backend.

### Main Queries

- `me` - Get current user info
- `transactions` - Get paginated transactions with filters
- `categories` - Get all user categories
- `categoryAnalytics` - Get spending analytics by category

### Main Mutations

- `login` / `register` - Authentication
- `createTransaction` / `updateTransaction` / `deleteTransaction` - Transaction management
- `createCategory` / `updateCategory` / `deleteCategory` - Category management

---

## Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 4000) | No |
