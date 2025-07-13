# EcoConnect: Technologies, Milestones, and Architecture Overview

## Technologies Used

### Frontend
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **React**: UI library for building interactive user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Shadcn UI**: Component library for modern, accessible UI components.
- **@react-google-maps/api**: Integration for Google Maps in React.
- **Recharts**: Charting library for data visualization.
- **Zod**: TypeScript-first schema validation.

### Backend
- **NestJS**: Progressive Node.js framework for building efficient, scalable server-side applications.
- **Prisma ORM**: Type-safe database ORM for PostgreSQL.
- **PostgreSQL**: Open-source, scalable relational database.

### AI & Cloud
- **Genkit**: AI orchestration and workflow toolkit.
- **Google AI (Gemini)**: Used for generating personalized sustainability tips.
- **Firebase Studio**: (Optional) For local emulation and hosting.

### Mobile
- **React Native (Expo)**: For cross-platform mobile app development.

---

## Milestones to Complete

1. **Project Initialization**
   - Set up monorepo structure (frontend, backend, mobile).
   - Configure version control and environment files.

2. **Frontend MVP**
   - Implement authentication UI (login/signup forms).
   - Dashboard with eco-impact stats and charts.
   - Directory and feed pages for organizations and community posts.
   - Interactive eco-map integration.

3. **Backend API**
   - Set up NestJS server.
   - Integrate Prisma ORM and connect to PostgreSQL.
   - Create User model and authentication endpoints.
   - Add endpoints for organizations, feed, and eco-map data.

4. **AI Integration**
   - Set up Genkit and Google AI for sustainability tips.
   - Create API endpoints for AI-powered features.

5. **Mobile App**
   - Scaffold React Native app with Expo.
   - Implement core screens and navigation.
   - Integrate with backend API.

6. **Testing & QA**
   - Add unit and integration tests.
   - Manual and automated UI testing.

7. **Deployment & Hosting**
   - Set up cloud hosting for frontend and backend.
   - Configure CI/CD pipelines.
   - Prepare production database and environment.

---

## How Everything Works Together

- **Frontend (Next.js)** communicates with the **Backend API (NestJS)** for all data (users, organizations, feed, etc.).
- **Backend** uses **Prisma** to interact with the **PostgreSQL** database, handling user authentication, data storage, and business logic.
- **AI features** (like sustainability tips) are powered by **Genkit** and **Google AI**, orchestrated via backend endpoints.
- **Mobile app** (React Native) uses the same backend API, ensuring feature parity across platforms.
- **Firebase Studio** can be used for local emulation and hosting previews during development.

---

## Notes
- All sensitive configuration (API keys, DB credentials) is managed via environment variables and never committed to version control.
- The architecture is modular, allowing for easy scaling and addition of new features (e.g., more AI tools, new data models, etc.). 