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

# Set production environment
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled app
COPY --from=builder /usr/src/app/dist ./dist

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# (copy any runtime assets needed by your app, e.g. views/public)
# COPY --from=builder /usr/src/app/public ./public

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]

# Alternative: Simple CMD without entrypoint script
# CMD ["sh", "-c", "npm run migration:run:prod && node dist/src/main.js"]