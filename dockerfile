# ./Dockerfile
ARG TARGETPLATFORM=linux/amd64          # ➜ override con --platform
FROM --platform=$TARGETPLATFORM node:20-alpine

# 📦 herramientas base
RUN apk add --no-cache bash git python3 make g++ \
  && corepack enable                    # pnpm/yarn opcionales

# 🚀 Expo CLI (paquete moderno)
RUN npm i -g expo@latest

# 👤 usuario sin privilegios
RUN addgroup -S expo && adduser -S expo -G expo
USER expo
WORKDIR /app

# 🔐 copia sólo manifest + lock ⇒ caché
COPY --chown=expo:expo package*.json ./
RUN npm install --legacy-peer-deps   # o simplemente npm install

# 📂 luego el resto del código
COPY --chown=expo:expo . .

# 🌍 variables y puertos
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    EXPO_USE_DEV_SERVER=true \
    NODE_ENV=development
EXPOSE 8081 19000 19001 19002

# 🏃 comando por defecto
CMD ["expo", "start", "--clear"]
