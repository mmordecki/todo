FROM node:20.7.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3123

CMD ["npm", "run", "dev"]`
