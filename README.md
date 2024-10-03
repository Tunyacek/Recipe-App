# Nom Nom Nation

A full-stack recipe management application built using **React (TypeScript)**, **Express**, **Prisma**, and **Supabase**. This app allows users to register, log in, create, view, search, and delete their recipes. It leverages **bcrypt** for password hashing and **JWT** for authentication. The UI is built using **Chakra UI**, and it ensures code quality with **ESLint** and **Husky**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)

## Features

- User registration and login.
- View all personal recipes with the ability to filter by name and category.
- Ability to create, update, delete, and view recipes with detailed information such as:
  - Title
  - Summary
  - Portions
  - Preparation/Cooking time
  - Rating
  - Ingredients
  - Instructions
  - Categories
- Secure password handling with bcrypt and authentication via JWT tokens.

## Tech Stack

### Frontend

- **React (TypeScript)** – Frontend framework.
- **Chakra UI** – UI components and styling.
- **Axios** – Networking.
- **React Router** – Client-side routing.

### Backend

- **Express** – Express – Backend framework.
- **Prisma** – Database.
- **Supabase** – For storage and database management.
- **bcrypt** – For password hashing.
- **JWT** – For user authentication.

### Database

- **Supabase** (configured with Prisma).

## Getting Started

To run this application locally, ensure you have [**Node.js**](https://nodejs.org/en/download/package-manager),[ **npm**](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), and [**Supabase**](https://supabase.com/).

### Prerequisites

- **Node.js** (v14+)
- **npm**
- **Supabase**

## Installation

Clone the repository:

```
git clone https://github.com/Tunyacek/Recipe-App.git
cd Recipe-App
```

### Backend Setup

1. Navigate to the backend directory:

```
   cd server
```

2. Install dependencies:

```
   npm install
```

3. Set up your `.env` file by creating it in the `server` directory with the following variables:

```
PORT= Express server port
FE_URL= Frontend server URL
DATABASE_URL= Connection string for your Supabase database.
DIRECT_URL= Direct connection string for Supabase.

STORAGE_URL= Supabase storage URL
SERVICE_KEY=Supabase service authentication key.

SALT_ROUNDS= Number of salt rounds for bcrypt hashing.
JWT_ACCESS_SECRET= Secret key for JWT access tokens.
JWT_REFRESH_SECRET= Secret key for JWT refresh tokens.
```

4. Run Prisma migrations to set up your database schema:

```
npm run db:migrate
```

5. Optionally, seed the database:

```
npm run db:seed
```

6. Start the backend server:

```
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```
cd client
```

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the `client` directory and configure the backend API URL:

```
VITE_BE_URL= Backend server URL
```

4. Start the frontend development server:

```
npm run dev
```

## Environment Variables

### Backend

- `PORT`: Port on which the Express server will run.
- `FE_URL`: URL of the frontend.
- `DATABASE_URL`: Connection string for your PostgreSQL or Supabase database.
- `DIRECT_URL`: Direct connection string for Supabase.
- `STORAGE_URL`: URL for Supabase storage.
- `SERVICE_KEY`: Supabase service key for authentication.
- `SALT_ROUNDS`: Number of salt rounds for bcrypt hashing.
- `JWT_ACCESS_SECRET`: Secret key for JWT access tokens.
- `JWT_REFRESH_SECRET`: Secret key for JWT refresh tokens.

### Frontend

- `VITE_BE_URL`: The base URL for your backend API.

## Database Setup

The application uses **Prisma** to interact with the database. You can configure **Supabase** in the `DATABASE_URL` of the `.env` file. To create the necessary tables, run:

```
npm run db:migrate
```

Optionally, seed your database with initial data:

```
npm run db:seed
```

To explore and manage your database, you can use Prisma Studio:

```
npm run db:studio

```

## Running the App

1. **Backend**: From the `server` directory, run:

```
npm run dev
```

2. **Frontend**: From the `client` directory, run:

```
npm run dev
```

## API Endpoints

Here are API endpoints for the application::

### Authentication

- `POST` /api/register: Register a new user.
- `POST` /api/login: Log in a user and return JWT.
- `POST` /api/logout: Log out the user.

### Recipes

- `GET` /api/recipes: Fetch all recipes for the logged-in user(requires authentication).
- `GET` /api/recipes/:id: Fetch a specific recipe by ID(requires authentication).
- `POST` /api/recipes: Create a new recipe (requires authentication).
- `PUT` /api/recipes/:id: Update an existing recipe (requires authentication). (Will be added)
- `DELETE` /api/recipes/:id: Delete a recipe (requires authentication).

### Folder Structure

```
.
├── .husky
client/
│
├── node_modules/           # Node modules installed for the client
├── public/                 # fav.icon
│
├── src/                    # Main source folder for frontend application
│   ├── assets/             # Static assets (images)
│   ├── Components/         # React components used across the app
│   │   ├── Createpage/     # Components for the Create Recipe page
│   │   ├── Homepage/       # Components for the Home page
│   │   ├── Recipepage/     # Components for viewing recipes
│   │   └── Shared/         # Shared components (header, footer, etc.)
│   ├── lib/                # Helper libraries and utilities
│   │   ├── interceptors/   # Axios interceptors for managing API requests
│   │   └── redux/          # Redux store and slices
│   └── theme.tsx           # Chakra UI theme configuration
│   ├── Pages/              # Page components made from components
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point for React application
│   ├── index.css           # Global styles for the app
│   └── main.tsx            # React root setup
│
├── .env                    # Environment variables for frontend
├── .eslintrc.cjs           # ESLint configuration
├── tsconfig.json           # TypeScript configuration
├── vite-env.d.ts           # Vite environment variables
├── vite.config.ts          # Vite configuration for the frontend app
├── package.json            # Dependencies and scripts
├── README.md               # Frontend-specific README (vite, eslint, ts)
└── ...other files          # Various config files
server/
│
├── dist/                   # Transpiled code for production
├── node_modules/           # Node modules installed for backend
│
├── prisma/                 # Prisma ORM related files
│   ├── migrations/         # Prisma migrations
│   ├── schema.prisma       # Database schema definition
│   └── seed.ts             # Seeder script for database seeding
│
├── src/                    # Main source folder for backend application
│   ├── domains/            # Domain logic for different features (routers, controllers, services, repositories, modules and schemas)
│   │   ├── category/       # Logic for category handling
│   │   ├── image/          # Logic for image saving
│   │   ├── recipe/         # Logic for recipe handling
│   │   ├── shared/         # Shared domains
│   │   └── userAuth/       # User authentication and authorization
│   ├── lib/                # Library and utility functions
│   ├── types/              # server/src/types/express.d.ts
│   ├── index.ts            # Entry point for backend server
│   └── middleware.ts       # Express middleware setup
│
├── .env                    # Environment variables for backend
├── .eslintrc.cjs           # ESLint configuration
├── tsconfig.json           # TypeScript configuration
├── commitlint.config.js    # Configuration for commitlint (commit message linter)
├── lint-staged.config.cjs  # Configuration for lint-staged
├── prettier.config.cjs     # Prettier code formatting configuration
├── package.json            # Dependencies and scripts
└── ...other files          # Various config files

```
