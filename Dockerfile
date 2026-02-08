# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install openssl for Prisma runtime
RUN apk add --no-cache openssl

# Copy only the necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# Copy the source to ensure prisma can find schema if needed in some contexts, 
# although prisma generate already happened.
COPY --from=builder /app/src ./src

# Set environment variables
ENV NODE_ENV=production

# Expose the port (Railway uses the PORT env var)
# We don't hardcode EXPOSE to 3001 to avoid confusion, 
# but Railway usually ignores this and uses the PORT env var.

# Command to run migrations, seeding, and then the application
CMD npx prisma migrate deploy && npx prisma db seed && npm run start:prod
