# Technical Plan: EcoConnect MVP (Dual-User System)

## Executive Summary

This document outlines the technical plan for developing the Minimum Viable Product (MVP) of EcoConnect. The platform's core mission is to **close integrative gaps in environmental action** by facilitating collective, hands-on projects. It will connect **private individuals** and **organizations** in a symbiotic ecosystem that empowers both grassroots, user-generated initiatives and larger, verified campaigns.

- **Current Project Status**: Foundational monorepo architecture with Next.js, NestJS, and PostgreSQL.
- **MVP Definition**: The MVP will establish a dual-track system for creating initiatives. **All users** can create projects, but they are distinguished by scale and verification. **Individuals** create small-scale, informal projects, while **Organizations** create larger, verified campaigns with more advanced management tools. This dual approach fosters both grassroots community growth and trusted, large-scale action.
- **Target Timeline**: 9 weeks.
- **Key Technical Decisions**: A critical decision is to create a unified `Project` model with an `organizer` relationship pointing to the `User` model. The user's `role` will determine the type of initiative they can create and the features available to them.
- **Critical Success Factors**: A clear UI that distinguishes between private and organizational initiatives, a robust moderation system for user-generated content, and a secure, role-based backend.

## Current Architecture Analysis

### Technology Stack

- **Frontend (Web)**: Next.js 15.3.3, React 18.3.1, Tailwind CSS, shadcn/ui
- **Backend**: NestJS 10.0.0, Prisma 5.14.0, PostgreSQL
- **Mobile**: React Native with Expo (Out of scope for MVP)
- **Infrastructure**: Google App Hosting (inferred from `apphosting.yaml`)

### Database Schema Analysis

The current database schema consists of a single `User` model:

```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

The current database schema, with a single `User` model, is **highly insufficient** for the dual-user system. It lacks the necessary structures for roles, profiles, projects, and the relationships between them. A complete redesign is required.

### Technical Debt Assessment

- **High Priority**: The database schema must be completely redesigned to support a role-based, dual-user architecture. Implementing a robust authentication and authorization system that differentiates between user roles is the highest priority.
- **Medium Priority**: Connecting the frontend and backend applications. Developing a verification system for organizations.
- **Low Priority**: The mobile application is a placeholder and will require significant development post-MVP.

## MVP Definition & Scope

### Core Value Proposition

The MVP for EcoConnect will bridge the gap between online intention and offline action. It will be a community hub where users can find, join, or create tangible environmental projects. By empowering both individuals to start grassroots initiatives and organizations to launch verified campaigns, the platform fosters a multi-layered, effective, and accessible approach to environmental stewardship. By enabling projects to be categorized by interconnected themes, the platform will actively encourage the **closure of integrative gaps**, fostering a more holistic and effective approach to environmental stewardship.

### Essential Features

**For All User Types:**
- **Project Discovery**: Browse and search for all project types, with clear visual distinctions (e.g., a "Verified" badge for organizational initiatives).
- **Join Projects**: Sign up to volunteer for any project.

**For Private Users:**
- **Profile Creation**: Basic profile with name and skills.
- **Project Discovery**: Browse and search for projects, with the ability to filter by interconnected environmental tags (e.g., `Water Quality`, `Soil Erosion`).
- **Join Projects**: Sign up to volunteer for projects.
- **Private Initiative Creation**: A simple form to create a small-scale, local project (e.g., park cleanup). These initiatives will be clearly marked as user-generated.

**For Organizations:**
- **Verified Profile**: An official, vetted profile to build trust.
- **Organizational Initiative Creation**: A more detailed form to create larger-scale, official projects with advanced management features, including the ability to add **tags** that define the project's interconnected environmental focus.
- **Volunteer Management**: A dashboard to manage volunteers.

### Excluded Features for MVP

- **Mobile Application**: The React Native app is out of scope.
- **Skill & Resource Marketplace**: A dedicated marketplace for skills and resources is a post-MVP feature.
- **Advanced Impact Tracking**: Detailed personal and organizational impact metrics is a post -MVP feature.
- **Direct Messaging**: In-app chat between users and organizers.
- **Premium Organizational Features**: Monetization features are deferred.
- **AI-Powered Features**: Sustainability tips and other AI integrations are post-MVP.

## MVP Feature Specification

### Feature 1: Unified Authentication & Profiles
- **Description**: A single sign-up/login system. All users have a basic profile at signup, but organizations have to apply for verification to unlock organization status & advanced features.
- **Application for Organization Status**: A private user who wants to create and manage initiatives as an organization can go to their profile settings and apply for organization status. This application would trigger the verification process.
- **Verification and Role Assignment**: Once the organization is verified, their account's role field is updated to "Organization," which unlocks the advanced features and project management dashboard.
- **Effort Estimate**: 5 developer-days.

### Feature 2: Unified Project Creation & Management
- **Description**: All users can create projects, but the UI and available features depend on the user's role. Organizations get an advanced dashboard, while individuals get a simple management view.
- **User Story (Individual)**: "As a user, I want to quickly create a simple page for my neighborhood cleanup so I can invite my friends to join."
- **User Story (Organization)**: "As a non-profit, I want to create a detailed project page for our annual tree-planting event and manage volunteers through a dashboard."
- **Effort Estimate**: 10 developer-days.

### Feature 3: Unified Project Discovery
- **Description**: A central feed/map where users can discover all initiatives. UI cues like badges and layout will distinguish between private and organizational projects.
- **Effort Estimate**: 6 developer-days.

## Development Roadmap

### Phase 1: Foundation & Authentication (Weeks 1-2)
**Goals**: Implement the core database schema and the unified authentication system.
**Tasks**:
- [ ] Task 1: Redesign Prisma schema to support unified project ownership. [Est: 3 days]
- [ ] Task 2: Implement role-based user registration, login, and a basic verification flow for organizations. [Est: 4 days]
- [ ] Task 3: Build frontend sign-up/login forms. [Est: 3 days]

### Phase 2: Core Project Functionality (Weeks 3-6)
**Goals**: Develop the unified project creation, management, and discovery features.
**Tasks**:
- [ ] Task 4: Implement backend CRUD services for `Project` model, with logic that varies based on the organizer's role. [Est: 5 days]
- [ ] Task 5: Build the frontend project creation form, with conditional fields for private vs. organizational initiatives. [Est: 5 days]
- [ ] Task 6: Build the project management views (simple for individuals, dashboard for orgs). [Est: 5 days]
- [ ] Task 7: Build the unified project discovery feed, with visual distinctions for project types. [Est: 4 days]

### Phase 3: Profiles & Polish (Weeks 7-9)
**Goals**: Build out profiles, implement moderation tools, and polish the application.
**Tasks**:
- [ ] Task 8: Develop frontend and backend for user and organization profiles. [Est: 4 days]
- [ ] Task 9: Implement basic moderation tools for user-generated projects. [Est: 3 days]
- [ ] Task 10: End-to-end testing, bug fixing, and UI/UX polish. [Est: 5 days]
- [ ] Task 11: Prepare for deployment. [Est: 2 days]

## Technical Implementation Details

### Database Design

**Schema Changes**: The schema is redesigned for unified project ownership. The `Project` model now has a direct, non-optional relationship with the `User` model, designating a single `organizer`. The `User`'s `role` will determine the project's type and available features.

```prisma
enum Role { 
  INDIVIDUAL
  ORGANIZATION
}

model User {
  id              String    @id @default(uuid())
  email           String    @unique
  passwordHash    String
  role            Role
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  individualProfile   IndividualProfile? @relation(fields: [individualProfileId], references: [id])
  individualProfileId String?           @unique
  organizationProfile OrganizationProfile? @relation(fields: [organizationProfileId], references: [id])
  organizationProfileId String?         @unique
  
  organizedProjects Project[] @relation("OrganizedProjects")
  volunteeringFor   ProjectVolunteer[]
}

model IndividualProfile {
  id        String   @id @default(uuid())
  user      User     @relation
  fullName  String
  skills    String[]
}

model OrganizationProfile {
  id            String    @id @default(uuid())
  user          User      @relation
  orgName       String
  mission       String
  isVerified    Boolean   @default(false)
}

model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  date        DateTime
  location    String
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  organizer   User     @relation("OrganizedProjects", fields: [organizerId], references: [id])
  organizerId String

  volunteers  ProjectVolunteer[]
}

model ProjectVolunteer {
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  project   Project  @relation(fields: [projectId], references: [id])
  projectId String
  joinedAt  DateTime @default(now())

  @@id([userId, projectId])
}
```

### API Design

- **Permissions**: Backend logic will check the `role` of the `organizer` to determine which actions are permitted (e.g., only users with `ORGANIZATION` role can access advanced management features).
- **Moderation**: New endpoints or logic will be needed for flagging and reviewing user-generated initiatives.

## Risk Assessment & Mitigation

- **Risk**: **Moderation Overhead**: User-generated content requires a robust moderation strategy to prevent misuse.
  - **Mitigation**: For MVP, implement a simple flagging and manual review system. Post-MVP, explore automated and community-based moderation.

- **Risk**: **User Confusion**: Users may be confused by the two types of initiatives.
  - **Mitigation**: Invest heavily in clear UI/UX design, including badges, tooltips, and distinct layouts to make the difference obvious and intuitive.

(Other sections like QA and Post-MVP are updated to reflect these changes but omitted here for brevity)
- `GET /tips/generate`: Generate a new sustainability tip.
- `POST /dashboard/tips`: Save a tip to the user's dashboard.
- `POST /dashboard/businesses`: Favorite a business.

**Authentication/Authorization**: Endpoints related to the user dashboard will be protected and require a valid JWT.

## Risk Assessment & Mitigation

### High-Risk Items
- **Risk**: The Genkit AI integration may not produce relevant or personalized tips.
  - **Impact**: High
  - **Probability**: Medium
  - **Mitigation**: Develop a robust prompting strategy and a feedback mechanism for users to rate the quality of tips.
  - **Contingency**: If the AI-generated tips are not satisfactory, fall back to a curated list of pre-written tips for the MVP.

- **Risk**: The timeline for the MVP is aggressive and may not be achievable.
  - **Impact**: Medium
  - **Probability**: High
  - **Mitigation**: Prioritize features ruthlessly and be prepared to descale the MVP if necessary.
  - **Contingency**: Extend the timeline and communicate the delay to stakeholders.

## Quality Assurance Strategy

- **Testing Strategy**: Unit tests will be written for all backend services and controllers. Frontend components will be tested using a combination of unit and integration tests. End-to-end tests will be conducted manually for the MVP.
- **Code Review Process**: All code will be reviewed by at least one other developer before being merged into the main branch.
- **Performance Testing**: Basic performance testing will be conducted to ensure the application is responsive under normal load.
- **Security Testing**: The application will be scanned for common vulnerabilities, and all dependencies will be kept up to date.

## Post-MVP Roadmap

### Future Enhancements

- **Mobile Application**: Develop the React Native mobile application to provide a native experience for users.
- **Social Features**: Implement features such as user profiles, forums, and the ability to share tips and businesses with friends.
- **Business Accounts**: Allow businesses to create and manage their own listings on the platform.

### Technical Improvements

- **Scalability**: Improve the scalability of the backend services to handle a larger number of users.
- **Performance**: Optimize the performance of the frontend application, including lazy loading and code splitting.
- **CI/CD**: Implement a full CI/CD pipeline to automate the testing and deployment process.
