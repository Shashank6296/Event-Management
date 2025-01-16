# Step 1: Use Node.js as base image
FROM node:16

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy backend files
COPY package*.json ./
COPY . .

# Step 4: Install dependencies
RUN npm install

# Step 5: Expose port
EXPOSE 5000

# Step 6: Start backend
CMD ["npm", "start"]
