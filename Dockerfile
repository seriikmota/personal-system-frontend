# ---- STAGE 1: build Angular (Node 20 LTS) ----
FROM node:20-alpine AS builder

ARG PKG_MGR=npm
ARG NG_BUILD_CONFIGURATION=production
ARG APP_API_URL=http://localhost:8080

ENV NG_BUILD_CONFIGURATION=${NG_BUILD_CONFIGURATION}
ENV APP_API_URL=${APP_API_URL}
WORKDIR /app

RUN corepack enable || true
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instala incluindo devDeps para compilar Angular
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.yarn \
    --mount=type=cache,target=/root/.pnpm-store \
    npm ci --include=dev

COPY . .

RUN npm run build --configuration="$NG_BUILD_CONFIGURATION"

COPY . .

RUN npx ng build --configuration="$NG_BUILD_CONFIGURATION"

FROM nginx:1.27-alpine AS runtime

RUN rm -f /etc/nginx/conf.d/default.conf

COPY infra/nginx.conf /etc/nginx/conf.d/app.conf

COPY --from=builder /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80

STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
