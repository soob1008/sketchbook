FROM node:16

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]