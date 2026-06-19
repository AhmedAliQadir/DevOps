# DevOps Portfolio API

A production-ready Node.js REST API demonstrating DevOps skills and best practices. Perfect for showcasing to recruiters!

## 🚀 Features

- **RESTful API** with Express.js
- **Docker Containerization** with multi-stage build
- **Docker Compose** for local development
- **CI/CD with GitHub Actions**
- **Kubernetes Deployment** configs
- **Infrastructure as Code** with Terraform
- **Prometheus & Grafana** monitoring ready
- **Comprehensive Logging** with Winston
- **Health Checks** (liveness & readiness probes)
- **Jest Testing** with coverage
- **ESLint** code quality

## 📋 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | Welcome message |
| `GET /api/health` | Basic health check |
| `GET /api/health/detailed` | Detailed health with system metrics |
| `GET /api/health/live` | Kubernetes liveness probe |
| `GET /api/health/ready` | Kubernetes readiness probe |
| `GET /api/devops` | DevOps skills & technologies |
| `GET /api/projects` | List all projects |
| `GET /api/projects/:id` | Get project by ID |
| `POST /api/projects` | Create new project |
| `GET /api/skills` | List all DevOps skills |
| `GET /api/skills/categories` | Skills grouped by category |
| `GET /api/metrics` | Application metrics |
| `GET /api/metrics/github` | GitHub contribution metrics |

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Logging:** Winston
- **Container:** Docker
- **Orchestration:** Kubernetes
- **IaC:** Terraform
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana

## 📦 Installation

```
bash
# Clone the repository
git clone <your-repo-url>
cd DevOps

# Install dependencies
npm install
```

## 🐳 Docker

```
bash
# Build Docker image
npm run docker:build

# Run container
npm run docker:run
```

## 🧪 Testing

```
bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run linter
npm run lint
```

## 🚀 Deployment

### Docker Compose (Local)
```
bash
docker-compose up -d
```

### Kubernetes
```
bash
kubectl apply -f k8s/
```

### Terraform (AWS)
```
bash
cd terraform
terraform init
terraform plan
terraform apply
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | development |
| `PORT` | Server port | 3000 |
| `LOG_LEVEL` | Logging level | info |

## 🔒 Security Features

- Helmet.js for HTTP headers
- CORS configuration
- Rate limiting ready
- Non-root container user
- Security scanning in CI/CD

## 📊 Monitoring

Access Grafana at `http://localhost:3001` (default credentials: admin/admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this for your portfolio!

## 👤 Author

Your Name - DevOps Engineer

---

⭐️ If you found this helpful, please star the repository!
