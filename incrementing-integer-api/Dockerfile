FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g pm2

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY src /usr/src/app/src

EXPOSE 3000
CMD [ "pm2-docker", "src/server.js" ]