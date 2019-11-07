FROM node:12.13.0-alpine
EXPOSE 8080
COPY server.js .
CMD node server.js
