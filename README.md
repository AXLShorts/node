# Production-Ready Node.js Backend

A production-ready Node.js + Express backend project using TypeScript with comprehensive tooling, monitoring, and code generation capabilities.

## 🚀 Features

- **TypeScript**: Strict mode enabled with ES Modules
- **Express.js**: Fast, minimalist web framework
- **MongoDB**: Document database with Mongoose ODM
- **Validation**: Zod schema validation for all inputs
- **Code Quality**: ESLint + Prettier + Husky + Commitlint
- **Testing**: Jest with coverage reports
- **Monitoring**: Prometheus metrics + Grafana dashboards
- **Code Generation**: Plop.js for scaffolding components
- **Docker**: Hot reload enabled development environment
- **Security**: Helmet, CORS, rate limiting

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Docker and Docker Compose (for containerized development)
- Git

## 🛠️ Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd production-nodejs-backend
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/production-backend
CORS_ORIGIN=*
```

### 3. Setup Git Hooks

```bash
npm run prepare
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Local development
npm run dev

# Docker development with hot reload
docker-compose up --build
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm start

# Or using Docker
docker build -t nodejs-backend .
docker run -p 3000:3000 nodejs-backend
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Code Generation

Generate new API components using Plop:

```bash
npm run plop
```

This will prompt you to:

1. Enter a router name (e.g., `user`)
2. Choose whether to define a schema
3. If yes, define schema fields interactively

### Generated Structure

For a router named `user`, Plop generates:

```
src/components/user/
├── routes/index.ts          # Express router with validation
├── controller/index.ts      # Request handlers
├── service/index.ts         # Business logic
├── model/index.ts          # Mongoose model
├── interface/index.ts      # TypeScript interfaces
├── validation/index.ts     # Zod schemas
└── tests/service.test.ts   # Unit tests
```

Plus:

- Swagger documentation in `src/swagger-api-docs/user.yaml`
- Auto-updates `src/api.ts` to include the new router

## 📊 Monitoring

### Prometheus Metrics

Available at `http://localhost:3000/metrics`

**Custom Metrics:**

- `http_requests_total` - Total HTTP requests
- `http_request_duration_seconds` - Request duration histogram
- `http_active_connections` - Active connections gauge

**Default Node.js Metrics:**

- Memory usage
- CPU usage
- Event loop lag
- Garbage collection

### Grafana Dashboard

When using Docker Compose:

- **Grafana**: `http://localhost:3001` (admin/admin)
- **Prometheus**: `http://localhost:9090`

## 🔧 Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build TypeScript to JavaScript           |
| `npm start`            | Start production server                  |
| `npm run lint`         | Run ESLint                               |
| `npm run lint:fix`     | Fix ESLint issues                        |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |
| `npm run type-check`   | TypeScript type checking                 |
| `npm test`             | Run tests                                |
| `npm run plop`         | Generate new components                  |

## 🏗️ Project Structure

```
├── .github/                 # GitHub templates
├── .husky/                 # Git hooks
├── .vscode/                # VS Code settings
├── monitoring/             # Prometheus & Grafana config
├── plop-templates/         # Code generation templates
├── src/
│   ├── components/         # Feature modules
│   │   └── <feature>/
│   │       ├── routes/     # Express routes
│   │       ├── controller/ # Request handlers
│   │       ├── service/    # Business logic
│   │       ├── model/      # Database models
│   │       ├── interface/  # TypeScript interfaces
│   │       ├── validation/ # Zod schemas
│   │       ├── tests/      # Unit tests
│   │       └── utils/      # Feature utilities
│   ├── core/              # Core utilities
│   ├── middleware/        # Express middleware
│   ├── utils/            # Shared utilities
│   ├── db/               # Database configuration
│   ├── swagger-api-docs/ # API documentation
│   ├── api.ts           # Route aggregation
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── Dockerfile           # Production container
├── Dockerfile.dev      # Development container
├── docker-compose.yml  # Development environment
└── package.json
```

## 📝 API Response Format

All API responses follow this format:

```typescript
{
  success: boolean;
  data?: any;
  status: number;
  message: string;
}
```

**Success Response:**

```json
{
  "success": true,
  "data": { "id": "123", "name": "John" },
  "status": 200,
  "message": "User retrieved successfully"
}
```

**Error Response:**

```json
{
  "success": false,
  "status": 400,
  "message": "Validation error: id is required"
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Zod schema validation
- **Environment Variables**: Secure configuration

## 🎯 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <message>

Examples:
feat(user): add user registration endpoint
fix(auth): resolve token validation issue
docs(readme): update setup instructions
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

## 🐳 Docker

### Development

```bash
docker-compose up --build
```

- Hot reload enabled
- MongoDB included
- Monitoring stack (Prometheus + Grafana)

### Production

```bash
docker build -t nodejs-backend .
docker run -p 3000:3000 nodejs-backend
```

## 🚦 Health Checks

- **Application**: `GET /health`
- **API Status**: `GET /api`
- **Metrics**: `GET /metrics`

## 📚 Documentation

- API documentation is auto-generated in `src/swagger-api-docs/`
- Each component includes OpenAPI 3.0 spec
- Access Swagger UI at `/api-docs` (when implemented)

## 🤝 Contributing

1. Follow the commit convention
2. Run `npm run lint` and `npm run format` before committing
3. Ensure tests pass with `npm test`
4. Add tests for new features
5. Update documentation as needed

## 📄 License

MIT License - see LICENSE file for details.
