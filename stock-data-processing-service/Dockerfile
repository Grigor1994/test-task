FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
