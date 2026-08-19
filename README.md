# E-Commerce Monorepo: Backend & Frontend with OpenAPI Synchronization

This repository is a fully integrated e-commerce application containing both a **Node.js/Express (TypeScript) backend** and a **React/Vite (TypeScript) frontend**, structured as a clean monorepo.

The system is synchronized automatically via an **OpenAPI specification contract**, featuring interactive **Scalar API documentation** on the backend and an **auto-generated type-safe API client** on the frontend.

---

## Repository Structure
```text
project/
├── server/                    # Express + TypeScript Backend
│   ├── src/
│   │   ├── config/swagger.ts  # OpenAPI & Swagger Specs configuration (v3.1.0)
│   │   ├── routes/            # JSDoc OpenAPI annotated routes
│   │   ├── app.ts             # Express app (Scalar Reference mounted)
│   │   └── server.ts          # Server entrypoint
│   ├── scripts/
│   │   └── generate-openapi.ts # Generates openapi.json from routes
│   └── generated/
│       └── openapi.json       # Generated OpenAPI specification
│
├── client/                    # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── generated/     # Auto-generated type-safe API client SDK
│   │   │   └── ...            # Helper services (auth, product, cart, orders)
│   │   ├── setupApi.ts        # Hand-written Axios interceptor layer (JWT retry & rotate)
│   │   └── main.tsx           # Application startup & API mounting
│   └── package.json
│
├── Dockerfile                 # Multi-stage production container build
├── .dockerignore              # Clean build context specification
└── README.md                  # This file
```

---

## 1. Quick Start (Local Development)

### Run the Backend (Server)
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   * Copy `.env.example` to `.env`.
   * Configure your `MONGO_URI` (Mongoose connection string) and secret keys.
4. Run in development mode (starts on port `5000`):
   ```bash
   npm run dev
   ```
5. **Interactive Scalar Docs**: Open `http://localhost:5000/docs` in your browser to view the API documentation.

### Run the Frontend (Client)
1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (starts on port `3000`):
   ```bash
   npm run dev
   ```

---

## 2. OpenAPI Client Generation

The frontend Axios client SDK is automatically generated from the backend's OpenAPI specification. 

Whenever you add or modify a backend API route, run the following command in either folder to synchronize:

* **From the Client Folder**:
  ```bash
  npm run generate
  ```
* **From the Server Folder**:
  ```bash
  npm run generate
  ```

This automatically reads `openapi.json` and updates the types, services, and core handlers in `client/src/api/generated/` instantly. All hand-written authentication and refresh token interceptors are located in `client/src/setupApi.ts` and will not be overwritten by regeneration.

---

## 3. Proxy and Base URL Setup

* **Local Proxy**: Vite is configured in [`client/vite.config.ts`](client/vite.config.ts) to proxy all requests starting with `/api` to `http://localhost:5000`. This eliminates CORS issues during local development.
* **Production Pathing**: `OpenAPI.BASE` is dynamically bound to `window.location.origin` in [`client/src/setupApi.ts`](client/src/setupApi.ts). In production, the backend serves the built client assets directly, routing everything relative to the host.

---

## 4. Production Build & Docker Deployment

A multi-stage Docker build is configured in the root directory. It compiles the frontend assets, builds the TypeScript backend, and bundles them into a lightweight container.

### Build and Run Locally with Docker
1. Build the image:
   ```bash
   docker build -t ecommerce-app .
   ```
2. Run the container:
   ```bash
   docker run -p 5000:5000 -e MONGO_URI="your_mongodb_uri" ecommerce-app
   ```

### Deploying to Render
1. Create a new **Web Service** on Render and connect your repository.
2. Select **Docker** as the environment.
3. Keep the Dockerfile path as `./Dockerfile` (in the root directory).
4. Configure your environment variables (like `MONGO_URI`, `ACCESS_TOKEN_SECRET`, etc.) in the Render Settings tab.
5. Render will automatically build the React assets, compile the server, and launch the unified container.
