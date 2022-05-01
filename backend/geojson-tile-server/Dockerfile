FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY ./src ./src
COPY ./tsoa.json ./tsoa.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./public ./public

# Copy Baumbestand JSON file
COPY ./data/baumbestandnew.geojson /usr/src/app/data/baumbestandnew.geojson


RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY ./build .

EXPOSE 8080
CMD [ "node", "build/src/server.js" ]
