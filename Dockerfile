# ---- STAGE 1: build Angular (Node 20 LTS) ----
FROM node:20-alpine AS builder

ARG PKG_MGR=npm
# REMOVIDO: ENV NODE_ENV=production  # <- isso quebra a instalação de devDeps
WORKDIR /app

RUN corepack enable || true
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instala incluindo devDeps para compilar Angular
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.yarn \
    --mount=type=cache,target=/root/.pnpm-store \
    if [ "$PKG_MGR" = "yarn" ]; then yarn --frozen-lockfile; \
    elif [ "$PKG_MGR" = "pnpm" ]; then pnpm install --frozen-lockfile; \
    else npm ci --include=dev; fi

COPY . .

# Use o script de build do package.json (recomendado)
RUN if [ "$PKG_MGR" = "yarn" ]; then yarn build; \
    elif [ "$PKG_MGR" = "pnpm" ]; then pnpm build; \
    else npm run build; fi

COPY . .

RUN npx ng build --configuration=production

FROM nginx:1.27-alpine AS runtime

RUN rm -f /etc/nginx/conf.d/default.conf

COPY infra/nginx.conf /etc/nginx/conf.d/app.conf

COPY --from=builder /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
