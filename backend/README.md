# CRM Backend

A Node.js backend API built with Express, TypeScript, and MongoDB.

## Features

- User authentication with JWT
- GitHub repository integration
- Project management
- MongoDB database with Mongoose ODM

## Prerequisites

- Node.js 20+
- MongoDB 6+
- Docker (optional)

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/crm-app

# JWT Configuration
JWT_SECRET=your-secret-key-here

# Server Configuration
PORT=5000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get user's projects (requires auth)
- `POST /api/projects` - Add a new project (requires auth)
- `DELETE /api/projects/:id` - Remove a project (requires auth)

## Database Migration

This project has been migrated from Prisma/PostgreSQL to Mongoose/MongoDB. The main changes include:

- Replaced Prisma client with Mongoose models
- Updated ID types from numbers to strings (MongoDB ObjectId)
- Updated all database operations to use Mongoose
- Removed Prisma schema and configuration files

## Docker

To run with Docker:

```bash
docker-compose up
```