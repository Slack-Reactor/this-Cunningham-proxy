FROM node:14

WORKDIR /app
COPY package*.json ./
RUN npm install
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . .
RUN npm run build

EXPOSE 3004
CMD ["node", "server/server.js"]
