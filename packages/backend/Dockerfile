# Use a specific version of Node.js that matches your local environment
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies inside the container with verbose logging
RUN npm install --force --loglevel verbose

# Copy the rest of your application code into the container
COPY ./packages/backend .

RUN npx prisma generate

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "dev"]
