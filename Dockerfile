FROM node:12.18.4

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y net-tools
RUN mkdir /app

WORKDIR /app

COPY Gemfile* .
RUN bundle install

COPY ./lib .

EXPOSE 4567

CMD ["ruby","server.rb"]
