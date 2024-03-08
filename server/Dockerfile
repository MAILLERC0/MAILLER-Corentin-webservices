FROM node:20-alpine

WORKDIR /server

COPY package.json .

COPY . .
RUN rm -r node_modules
RUN npm install pm2 -g
RUN npm install

CMD ["pm2-runtime", "src/index.js"]



