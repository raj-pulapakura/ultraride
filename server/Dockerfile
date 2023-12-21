FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i

RUN npm i --save-dev

COPY . . 

EXPOSE 80

CMD ["npm", "run", "dev-build"]