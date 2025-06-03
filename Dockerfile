# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project for production (output will be in the "dist" directory)
RUN npm run build

# Stage 2: Run the production build
FROM node:18-alpine

# Set the working directory for the production environment
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose port 3000 to access the app
EXPOSE 8133

# Run the app using 'serve' on port 3000
CMD ["serve", "-s", "dist", "-l", "8133"]
