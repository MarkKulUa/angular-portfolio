# Angular 21 + NestJS Portfolio Project

> Production-ready full-stack TypeScript monorepo demonstrating modern Angular and NestJS architecture patterns

## About

This is a portfolio project showcasing enterprise-grade development practices with the latest Angular 21 and NestJS 11 technologies. The project demonstrates:

- Modern Angular 21 with Signals and standalone components
- NestJS 11 with Fastify for high-performance backend
- Monorepo architecture with npm workspaces
- Comprehensive testing setup (Vitest + Jest)
- Production-ready code quality tools (ESLint, Prettier, Husky)
- Architecture enforcement with Sheriff
- Full TypeScript strict mode

## Tech Stack

**Frontend:**
- Angular 21.0.6 - Standalone components, Signals, Zoneless
- Vitest - Modern testing framework
- Angular Material - UI components
- TypeScript 5.9 - Strict mode

**Backend:**
- NestJS 11 - Enterprise Node.js framework
- Fastify - High-performance HTTP server
- Zod - Schema validation
- OpenAPI/Swagger - API documentation
- Jest - Testing framework

**Code Quality:**
- ESLint + Prettier - Linting and formatting
- Husky + lint-staged - Git hooks
- Sheriff - Architecture boundaries enforcement

## Requirements

- **Node.js**: 24+ (current: 22.16.0 - upgrade recommended)
- **npm**: 11+ (current: 10.9.2 - upgrade recommended)
- **Angular CLI**: 21+ (global installation required)

```bash
# Install Angular CLI 21 globally
npm install -g @angular/cli@21

# Verify installation
ng version
```

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd angular-portfolio

# 2. Install root dependencies
npm install

# 3. Install frontend dependencies
cd frontend
npm install

# 4. Install backend dependencies
cd ../backend
npm install

# 5. Return to root
cd ..
```

## Running the Project

### Development Mode

```bash
# Run both frontend and backend simultaneously
npm run dev

# Or run separately:
npm run dev:frontend  # Frontend only (http://localhost:4200)
npm run dev:backend   # Backend only (http://localhost:3000)
```

### Production Mode

```bash
# Build for production
npm run build

# Start production servers
cd frontend && npm run start:prod
cd backend && npm run start:prod
```

## Testing

```bash
# Run all tests
npm test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend

# Run tests with coverage
npm run test:frontend -- --coverage
npm run test:backend -- --coverage

# Run tests in watch mode
cd frontend && npm run test -- --watch
cd backend && npm run test:watch
```

## Linting & Formatting

```bash
# Lint all code
npm run lint

# Lint and auto-fix
npm run lint:frontend -- --fix
npm run lint:backend -- --fix

# Format code with Prettier
cd frontend && npm run format
cd backend && npm run format

# Check formatting
cd frontend && npm run format:check
```

## Building

```bash
# Build entire project
npm run build

# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend

# Analyze frontend bundle size
cd frontend && npm run analyze
```

## Deployment

### Full Stack Deployment with Vercel (Recommended)

Vercel can host both your Angular frontend and NestJS backend as serverless functions.

**Frontend Deployment:**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy frontend
cd frontend
vercel

# For production
vercel --prod
```

**Backend Deployment:**

Create `vercel.json` in backend directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/main.ts"
    }
  ]
}
```

Then deploy:
```bash
cd backend
vercel --prod
```

**Connect Frontend to Backend:**
Update `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend.vercel.app/api',
  // ...
};
```

### Alternative Deployment Options

**Frontend:**
- Netlify - Similar to Vercel
- AWS S3 + CloudFront - More control
- Firebase Hosting - Google ecosystem
- GitHub Pages - Free for public repos

**Backend:**
- Render - Easy Node.js hosting with databases
- Railway - Good for apps with PostgreSQL
- Heroku - Classic PaaS (paid)
- AWS Elastic Beanstalk - Enterprise solution
- DigitalOcean App Platform - Simple VPS alternative

## Available Commands

### Root Level
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm test                 # Run all tests
npm run lint             # Lint all code
```

### Frontend Commands
```bash
npm start                # Start dev server (http://localhost:4200)
npm run build            # Build for production
npm test                 # Run Vitest tests
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run analyze          # Analyze bundle size
npm run sheriff          # Check architecture rules
```

### Backend Commands
```bash
npm run start:dev        # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start:prod       # Start production server
npm test                 # Run Jest tests
npm run test:e2e         # Run E2E tests
npm run test:cov         # Run tests with coverage
npm run lint             # Run ESLint
npm run format           # Format with Prettier
```

## Vercel Deployment Guide

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Angular and deploy

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add your production variables:
     - `VITE_API_URL` - Your backend URL
     - `JWT_SECRET` - Your JWT secret
     - etc.

4. **Deploy Backend (Optional):**
   - Create separate Vercel project for backend
   - Or use Vercel Serverless Functions
   - Or use Render/Railway for backend with database

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a preview URL
- **Rollback**: Easy rollback to previous deployments

## Project Structure

```
angular-portfolio/
├── frontend/                 # Angular 21 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Singleton services, guards, interceptors
│   │   │   ├── shared/      # Reusable components, pipes, directives
│   │   │   ├── features/    # Feature modules (lazy-loaded)
│   │   │   └── app.routes.ts
│   │   ├── environments/
│   │   └── assets/
│   ├── .ai/                 # AI assistant configuration
│   └── .sheriff/            # Architecture rules
├── backend/                  # NestJS 11 application
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── users/           # Users module
│   │   ├── common/          # Shared utilities
│   │   └── main.ts
│   └── test/                # E2E tests
├── .github/workflows/        # CI/CD pipelines
├── .husky/                  # Git hooks
└── package.json             # Root workspace configuration
```

## API Endpoints

### Frontend (http://localhost:4200)
- `/` - Dashboard (redirects)
- `/auth/login` - Login page
- `/dashboard` - Dashboard page
- `/profile` - Profile page (protected)

### Backend (http://localhost:3000)
- `GET /` - Health check
- `GET /health` - Health status
- `GET /api/docs` - Swagger UI documentation
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `POST /auth/login` - User login

## Key Features

### Angular 21 Features
- ✅ Standalone components (no NgModules)
- ✅ Signal-based state management
- ✅ OnPush change detection everywhere
- ✅ Vitest for testing (10-20x faster than Karma)
- ✅ Functional guards and interceptors
- ✅ Path aliases (@core, @shared, @features)
- ✅ Lazy loading routes
- ✅ Angular Material UI

### NestJS Features
- ✅ Fastify adapter (2x faster than Express)
- ✅ Zod validation with type safety
- ✅ OpenAPI/Swagger documentation
- ✅ Layered architecture (Controller → Service)
- ✅ E2E testing with Supertest
- ✅ Helmet security middleware
- ✅ Rate limiting

### Code Quality
- ✅ ESLint + Prettier integration
- ✅ Pre-commit hooks (lint + format + test)
- ✅ Pre-push hooks (full test suite + build)
- ✅ Sheriff architecture enforcement
- ✅ Strict TypeScript mode
- ✅ Zero security vulnerabilities
- ✅ Accessibility checks
- ✅ Performance budgets

## Environment Variables

Create `.env` file in the root directory:

```env
# Frontend
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Angular NestJS Portfolio

# Backend
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:4200
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4200 (frontend)
lsof -ti:4200 | xargs kill -9

# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9
```

### Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm install
```

### TypeScript Errors
```bash
# Verify TypeScript version (should be 5.9.x)
cat frontend/node_modules/typescript/package.json | grep version

# Clear Angular cache
rm -rf frontend/.angular frontend/node_modules/.cache
```

## Contributing

1. Follow Angular Style Guide: https://angular.dev/style-guide
2. Write tests for new features
3. Ensure all checks pass: `npm run lint && npm test && npm run build`
4. Use conventional commits
5. Update documentation as needed

## License

MIT

## Contact

For questions or feedback about this portfolio project, please open an issue.

---

**Built with Angular 21 + NestJS 11 | Production-Ready | Enterprise-Grade**
