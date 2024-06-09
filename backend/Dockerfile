FROM ubuntu

# Update package list and install required tools
RUN apt update && \
    apt install -y curl software-properties-common

# Add Node.js repository and install Node.js
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY models models
COPY router router
COPY uploads uploads
COPY views views
COPY app.js app.js
COPY mongoDB.js mongoDB.js

# Install dependencies
RUN npm install

# Set the entry point
CMD ["node", "app.js"]
