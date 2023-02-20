# Base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy everything
COPY . .

# Build the application
RUN npm run build

# Set the start command
CMD ["npm", "start"]