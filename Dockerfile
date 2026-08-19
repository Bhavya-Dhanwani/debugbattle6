# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for both client and server
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies for both projects
RUN npm ci --prefix server
RUN npm ci --prefix client

# Copy source code for both projects
COPY server/ ./server/
COPY client/ ./client/

# Build both frontend and backend
RUN npm run build --prefix server
RUN npm run build --prefix client

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy server production dependencies and build artifacts
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/dist ./server/dist

# Copy client built assets so the server can serve them at runtime
COPY --from=builder /app/client/dist ./client/dist

# Run from the server directory
WORKDIR /app/server

EXPOSE 5000

# Start the compiled JS server
CMD ["node", "dist/server.js"]