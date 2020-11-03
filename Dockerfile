FROM node:10 as build

WORKDIR /hacker-news

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn run build

ENV NODE_ENV production

EXPOSE 3000

RUN node_modules/.bin/webpack --config webpack.server.js

CMD ["node", "./server-build/index.js"]
