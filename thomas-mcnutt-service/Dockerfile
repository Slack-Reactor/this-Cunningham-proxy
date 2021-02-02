# what base image we want
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . .
RUN npm run build

EXPOSE 3003
CMD ["node", "Server/start.js"]