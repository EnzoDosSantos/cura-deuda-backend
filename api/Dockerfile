FROM node:16.18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .


CMD [ "npm", "run", "dev" ]