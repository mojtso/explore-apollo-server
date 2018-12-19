FROM node:alpine

WORKDIR usr/www/app

COPY package.json ./
RUN yarn
COPY . .

EXPOSE 4000
CMD ["yarn", "dev"]