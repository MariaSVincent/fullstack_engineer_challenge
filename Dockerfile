FROM node:alpine
ENV NODE_ENV=production

WORKDIR /lightfeather_challenge
EXPOSE 8080
COPY . .
RUN npm install --production
RUN npm run build
ENTRYPOINT ["node", "server.js"]