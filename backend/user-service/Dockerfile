FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN #npm install
# If you are building your code for production

# Bundle app source
COPY . .
RUN npm install glob rimraf
RUN npm i -g typeorm ts-node
RUN npm install
RUN npm run build

EXPOSE 8080
CMD npm run db:migrate:update && npm start
