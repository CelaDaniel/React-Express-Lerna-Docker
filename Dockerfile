FROM node:18-alpine

WORKDIR /usr/src/app

# Install Lerna globally
RUN npm install -g lerna

# Copy package definitions
COPY package*.json ./

# Install root and workspace dependencies
RUN npm install --legacy-peer-deps

# Copy all other necessary files
COPY . .

# Expose the necessary port numbers
EXPOSE 3000 5000

# Start command can be overridden by docker-compose if necessary
CMD ["npm", "start"]
