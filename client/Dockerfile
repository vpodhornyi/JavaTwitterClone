# ===== build stage =====
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== runtime stage =====
FROM nginx:1.27-alpine

# SPA build
COPY --from=build /app/build /usr/share/nginx/html

# SPA routing (fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80