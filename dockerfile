FROM node:18-alpine AS builder
 
WORKDIR /app
 
COPY package*.json ./
# Instala as dependências
RUN npm install --legacy-peer-deps

COPY ./ ./
 
ARG NEXT_PUBLIC_BASE_URL
ARG KEYCLOAK_CLIENT_ID
ARG KEYCLOAK_CLIENT_SECRET
ARG KEYCLOAK_ISSUER
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG NODE_TLS_REJECT_UNAUTHORIZED

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID
ENV KEYCLOAK_CLIENT_SECRET=$KEYCLOAK_CLIENT_SECRET
ENV KEYCLOAK_ISSUER=$KEYCLOAK_ISSUER
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED
 
# Builda o projeto
RUN npm run build

# Etapa 2: Imagem para produção
FROM node:18-alpine
 
WORKDIR /app
 
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.husky ./.husky
 
RUN npm install --legacy-peer-deps
 
EXPOSE 3000
 
CMD ["npm", "run", "start"]
