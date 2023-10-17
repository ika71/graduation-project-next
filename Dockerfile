FROM node:18-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

RUN mkdir -p /app/.next/cache

EXPOSE 3000

CMD [ "npm", "start" ]