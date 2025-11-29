FROM node:20-alpine

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy backend source
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
