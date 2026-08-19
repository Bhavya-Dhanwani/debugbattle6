# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY server/package*.json ./server/

# Install dependencies in the server subdirectory
WORKDIR /app/server
RUN npm ci

# Copy the rest of the server source code
WORKDIR /app
COPY server/ ./server/

# Build the TypeScript project into JS
WORKDIR /app/server
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app/server

# Copy production dependencies and build artifacts from builder stage
COPY --from=builder /app/server/package*.json ./
COPY --from=builder /app/server/node_modules ./node_modules
COPY --from=builder /app/server/dist ./dist

# Copy env.example as a fallback (.env variables should be set in Render settings)
COPY --from=builder /app/server/.env.example ./

EXPOSE 5000

# Start the compiled JS server
CMD ["node", "dist/server.js"]