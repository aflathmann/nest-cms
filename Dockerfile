# --- build stage ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Install all deps (including dev) for building
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# --- runtime stage ---
FROM node:20-alpine
WORKDIR /usr/src/app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled app
COPY --from=builder /usr/src/app/dist ./dist

# (copy any runtime assets needed by your app, e.g. views/public)
# COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000
CMD ["node", "dist/main.js"]