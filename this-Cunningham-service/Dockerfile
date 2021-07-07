# what base image we want
FROM node:14
# to improve performance
# ENV NODE_ENV=production

# create app dir and then cd into it, this allows us to use relative file paths and install everything else in /app
WORKDIR /app
# the ./ is telling docker where we want to copy the package.json/lock in the container
COPY package*.json ./
RUN npm install
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV HTTP_PROXY="http://ec2-3-139-68-84.us-east-2.compute.amazonaws.com"

COPY . .
RUN npm run build:prod

EXPOSE 3001
CMD ["node", "server"]

# docker compose file below

# version: '3.4'

# services:
#   mongo:
#     container_name: mongo
#     image: mongo
#     environment:
#       MONGO_INITDB_DATABASE: tripadvisor-db
#     volumes:
#       - ./db/seed.js:/docker-entrypoint-initdb.d/seed.js:ro
#       # - ./data:/data/db
#     ports:
#       - 27017:27017
#   thiscunninghamservice:
#     container_name: app
#     image: thiscunninghamservice
#     build:
#       context: .
#       dockerfile: ./Dockerfile
#     ports:
#       - 3001:3001
#     links:
#       - mongo