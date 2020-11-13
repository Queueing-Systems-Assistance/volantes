FROM node:14.15.0-slim

ARG RELEASE_VERSION
ENV RELEASE_VERSION ${RELEASE_VERSION}

WORKDIR /usr/volantes

COPY ./.env /usr/volantes/.env
COPY ./package.json /usr/volantes/package.json
COPY ./package-lock.json /usr/volantes/package-lock.json

RUN npm ci --production

COPY ./src/ /usr/volantes/src/

CMD ["node", "./src/index.js"]
