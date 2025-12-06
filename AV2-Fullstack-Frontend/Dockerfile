# --------------------------
# Stage 1: Build
# --------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Cria um arquivo .env temporário para o build do Vite
ARG VITE_BACKEND_URL
RUN echo "VITE_BACKEND_URL=$VITE_BACKEND_URL" > .env

# Build do frontend
RUN npm run build

# --------------------------
# Stage 2: Nginx
# --------------------------
FROM nginx:alpine

# Limpa conteúdo padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia build do frontend
COPY --from=build /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]