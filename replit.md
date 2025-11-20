# DeepMinds - AI-Powered Deepfake Detection Platform

## Overview

DeepMinds is a web-based platform for detecting deepfakes and authenticating digital evidence using AI-powered multimodal analysis. The application targets journalists, legal professionals, and institutions requiring verification of media authenticity. Users can upload images, videos, and audio files to receive credibility scores, manipulation indicators, and detailed technical analysis reports.

The platform emphasizes professional credibility through a Material Design-influenced interface with clear information hierarchy and trust signals embedded throughout the user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript in SPA (Single Page Application) mode

**Routing**: Wouter for lightweight client-side routing with three main routes:
- Home page (`/`) - Hero section, features showcase, and pricing information
- Upload page (`/upload`) - Media file upload interface with drag-and-drop
- Results page (`/results/:id`) - Detailed analysis display for scanned media

**State Management**: 
- TanStack Query (React Query) for server state management and API caching
- Local component state using React hooks for UI interactions

**UI Component Library**: shadcn/ui (Radix UI primitives) with custom theme configuration
- Professional design system with Material Design influence
- Consistent spacing, typography, and interaction patterns
- Dark mode support through CSS variables

**Styling**: 
- Tailwind CSS with custom design tokens
- Typography: Inter for UI elements, JetBrains Mono for technical data
- Custom color system using HSL values with alpha transparency support

**Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful endpoints with JSON responses
- `POST /api/analyze` - Media upload and analysis endpoint (uses multer for file handling)
- `GET /api/scans/:id` - Retrieve analysis results
- `GET /api/scans` - List all scans (if implemented)

**File Upload**: Multer middleware configured for in-memory storage with 100MB file size limit

**Data Models** (defined in `shared/schema.ts`):
- `User` - User accounts with username/password
- `MediaScan` - Analysis results including credibility scores, manipulation indicators, and technical metadata
- Type-safe schema validation using Drizzle-Zod

**Storage Layer**: Abstract storage interface (`IStorage`) with in-memory implementation (`MemStorage`)
- Designed for easy transition to database persistence
- CRUD operations for users and media scans
- Uses UUID for entity identifiers

**Mock Analysis**: Current implementation generates simulated analysis results based on file characteristics
- Credibility scoring algorithm varies by filename hash
- Manipulation indicators tailored to media type (facial, audio, compression)
- Structured technical analysis with metadata, forensic markers, and cross-validation

### Data Storage Solutions

**Current State**: In-memory storage using JavaScript Maps
- Volatile storage suitable for development/demo
- Data lost on server restart

**Configured for Migration**: Drizzle ORM configured with PostgreSQL schema
- Schema defined in `shared/schema.ts` with pgTable definitions
- Migration system ready (`drizzle.config.ts` points to PostgreSQL)
- Tables: `users`, `media_scans` with proper constraints and JSON fields

**Database Preparation**: Application expects `DATABASE_URL` environment variable for PostgreSQL connection via Neon serverless driver

### Authentication and Authorization

**Current State**: Schema includes user table with username/password fields
- Authentication routes not yet implemented in visible codebase
- Session management dependencies installed (connect-pg-simple for PostgreSQL sessions)

**Planned Implementation**: Traditional session-based authentication with PostgreSQL session store

### Key Architectural Decisions

**Monorepo Structure**: Single repository with clear separation
- `/client` - React frontend application
- `/server` - Express backend API
- `/shared` - Shared TypeScript types and schemas
- Enables type-safe communication between frontend and backend

**Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- Zod schemas for runtime validation
- Drizzle-Zod integration for database schema validation
- Path aliases configured for clean imports (`@/`, `@shared/`)

**Development Experience**:
- Hot module replacement (HMR) in development via Vite
- Concurrent frontend/backend development
- Express middleware logs API requests with response truncation
- Error overlay and development banners in Replit environment

**Production Build Strategy**:
- Frontend: Vite bundles React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Static file serving from Vite build output in production

**Scroll Management**: Custom scroll manager utility for smooth cross-route section navigation
- Handles deferred scrolling when navigating from external routes
- Section registration system for features and pricing anchors
- Uses `requestAnimationFrame` for smooth scroll behavior

## External Dependencies

### Core Framework Dependencies
- **React 18** - Frontend UI framework
- **Express.js** - Backend web server
- **TypeScript** - Type safety across entire stack
- **Vite** - Frontend build tool and dev server

### Database & ORM
- **Drizzle ORM** - Type-safe database toolkit
- **@neondatabase/serverless** - PostgreSQL serverless driver for Neon
- **connect-pg-simple** - PostgreSQL session store for Express

### UI Component Libraries
- **@radix-ui/** (multiple packages) - Accessible component primitives
- **shadcn/ui** - Pre-styled component system built on Radix
- **Tailwind CSS** - Utility-first CSS framework
- **lucide-react** - Icon library
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Utility for merging Tailwind classes

### State Management & Data Fetching
- **@tanstack/react-query** - Server state management
- **wouter** - Lightweight routing library

### Form Handling
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Validation resolver adapters
- **zod** - Schema validation library

### File Upload
- **multer** - Multipart form data handling for file uploads

### Development Tools
- **@replit/vite-plugin-*** - Replit-specific development enhancements
  - Runtime error modal
  - Cartographer for code navigation
  - Development banner

### Font Resources
- **Google Fonts**: Inter (primary UI), JetBrains Mono (technical data)
- Loaded via HTML link tags for optimal performance

### Asset Management
- Custom Vite alias for attached assets (`@assets`)
- Static image resources served from attached_assets directory