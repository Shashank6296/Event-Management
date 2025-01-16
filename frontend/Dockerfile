# Step 1: Use Node.js as base image
FROM node:16

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy frontend files
COPY package*.json ./
COPY . .

# Step 4: Install dependencies and build frontend
RUN npm install
RUN npm run build

# Step 5: Expose port
EXPOSE 3000

# Step 6: Serve static files using serve
CMD ["npx", "serve", "-s", "build"]
