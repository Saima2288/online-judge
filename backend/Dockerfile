FROM node:22-alpine

WORKDIR /app

# Install necessary build tools and Java (JDK 17)
RUN apk update && apk add --no-cache \
    g++ \
    gcc \
    libstdc++ \
    make \
    python3 \
    openjdk17-jdk

# Copy dependency files
COPY package.json ./
COPY package-lock.json ./ 

# Install node dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (make sure your server runs on this)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
