FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Adiciona variável definitiva no build
ENV NODE_ENV=production

RUN npm run build

# --------------------------
# Etapa final: NGINX
# --------------------------
FROM nginx:alpine

# Remove configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

# Copiar um nginx.conf personalizado (recomendado para SPAs)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]