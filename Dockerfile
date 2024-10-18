# Stage 1: Build the React app
FROM node:19 as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Expose port 3001 for the app to run
EXPOSE 8080

# Start the app on port 3001
CMD ["npm", "run" ,"serve"]