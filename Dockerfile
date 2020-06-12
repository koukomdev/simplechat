FROM ruby:2.5.8-alpine

RUN apk --no-cache add --update build-base libffi-dev mariadb-dev tzdata

WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN bundle install

EXPOSE 4567
