FROM node:latest

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

WORKDIR /usr/src/app

RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm i

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

USER node
