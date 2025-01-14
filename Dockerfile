FROM node:23-alpine
LABEL authors="tomchauvel"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

CMD npm run build

EXPOSE 80

ENV HOST=0.0.0.0 PORT=80

CMD ["npm", "run", "start:prod"]