# GitHub CRM Frontend

A React-based frontend for the GitHub CRM system that allows users to manage GitHub repositories.

## Features

- User authentication (login/register)
- View GitHub projects with detailed information
- Add new GitHub repositories
- Update existing project data
- Delete projects
- Modern Material-UI interface
- Real-time data updates with React Query

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI)
- React Query (TanStack Query)
- React Router
- Axios for API calls

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ProjectList.tsx
│   ├── AddProjectDialog.tsx
│   ├── EditProjectDialog.tsx
│   ├── Layout.tsx
│   └── ProtectedRoute.tsx
├── hooks/              # Custom React Query hooks
│   ├── useAuth.ts
│   └── useProjects.ts
├── pages/              # Page components
│   └── AuthPage.tsx
├── services/           # API service layer
│   └── api.ts
├── App.tsx            # Main app component
└── index.tsx          # App entry point
```

## API Integration

The frontend integrates with the backend API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Authentication

The application uses JWT tokens stored in localStorage for authentication. The token is automatically included in API requests and the user is redirected to login if the token is invalid or expired.
