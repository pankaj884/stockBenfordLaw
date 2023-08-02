# Use the official Node.js 18 image
FROM node:18.17.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN mkdir 'dist'


# Install project dependencies

RUN npm install typescript -g
RUN npm install

# Copy the rest of the application
COPY . .

RUN chown -R node:node "/usr/src/app"
RUN chown -R node:node "/usr/src/app/dist"

# Change to non-root privilege
USER node

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
