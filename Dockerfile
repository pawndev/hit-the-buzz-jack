FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 8090
ENV APPLICATION_TITLE "Hit The Buzz, Jack"

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN npm run build

EXPOSE 8090

CMD ["npm", "run", "run"]
