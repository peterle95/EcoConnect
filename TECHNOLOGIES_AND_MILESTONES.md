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

1. Login Page:

- Replace the current static picture background with a video background.
- Implement logic to detect slow network connections and switch to a static picture backup for the background in such cases.
- Add social login functionality for Google, Apple, and Meta accounts. This involves integrating their respective SDKs or APIs and handling the authentication flow.

2. Sign Up Page:

- Apply the same background video and static picture fallback as the login page.
- Implement a password confirmation field.
- Add JavaScript or TypeScript logic to compare the two password fields and ensure they match before allowing form submission.
- Integrate social signup functionality for Google, Apple, and Meta accounts, similar to the login page.

## Core Pages:

4. Dashboard:

- Develop the UI for the dashboard page.
- Integrate with the backend API to fetch eco-impact statistics.
- Use the Recharts library to create and display charts visualizing the eco-impact data.

5. Directory Page:

- Create the UI for the directory page.
- Fetch data about organizations from the backend API.
- Display the organization data in a user-friendly format (e.g., a list, cards, or a table).

6. Feed Page:

- Build the UI for the feed page.
- Retrieve community posts data from the backend API.
- Display the feed content, including post details and potentially user information.

7. Eco-Map Integration:

- Integrate the @react-google-maps/api library into the relevant page (likely a dedicated map page or integrated into the dashboard).
- Fetch eco-map data (e.g., locations of eco-friendly businesses, community projects) from the backend API.
- Display the eco-map using the fetched data, including markers, info windows, or other relevant map features.

8. Component Development:

- Utilize Shadcn UI: Throughout the frontend development process, leverage the Shadcn UI component library to build modern and accessible - - UI elements for all pages and components.

9. Data Handling and Validation:

- API Integration: Implement functions and hooks to interact with the backend API for fetching and sending data for all frontend features.
- Data Validation: Use Zod for TypeScript-first schema validation to ensure the integrity of data received from the backend and user input.

10. Styling:

- Tailwind CSS: Use Tailwind CSS classes to style all frontend components and pages, ensuring a consistent and responsive design.

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