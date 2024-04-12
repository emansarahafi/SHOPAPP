FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8022

LABEL org.opencontainers.image.source="https://github.com/emansarahafi/shopapp"

CMD ["node", "index"]