
FROM node:10 as build

WORKDIR /hacker-news

# copy package.json yarn.lock files
COPY package.json yarn.lock ./

# RUN npm i -g yarn
# install dependencies
RUN yarn --frozen-lockfile

# copy source code to working directory
COPY . .

# expose the port in which app is running
EXPOSE 3006

# build front-end code
RUN yarn run build

ENV NODE_ENV production

# build server code
RUN node_modules/.bin/webpack --config webpack.server.js

CMD ["node", "./server-build/index.js"]
