FROM node:20.13.1-alpine

WORKDIR /app

COPY package*.json ./

COPY config config/

COPY src src/

RUN npm install --omit=dev

USER node

CMD npm run knex:migrate:latest && npm start
