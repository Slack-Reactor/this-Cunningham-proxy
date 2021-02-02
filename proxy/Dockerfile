FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]