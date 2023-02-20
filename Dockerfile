# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Set the working directory
WORKDIR /app

# Copy everything
COPY . .

# Build the application
# RUN npm run build

# Set the start command
CMD ["npm", "start"]