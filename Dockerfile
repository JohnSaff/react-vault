FROM node:12.18.4

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y net-tools
RUN mkdir /app
RUN mkdir /app/api

WORKDIR /app/api

COPY ./package*.json ./
RUN npm install
COPY . .

WORKDIR /app
RUN mkdir /app/client

WORKDIR /app/client

COPY ./client/package*.json ./
RUN npm install

COPY ./client .

EXPOSE 3000

WORKDIR /app
COPY startVault.sh .

CMD ./startVault.sh
