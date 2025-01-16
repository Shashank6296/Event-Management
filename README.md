Event Management Application
A feature-rich Event Management app built using the MERN (MongoDB, Express, React, Node.js) stack. The app enables users to create, view, edit, and delete events, with added support for categories, reminders, and browser notifications.

🌟 Features
Core Functionality
Add Events: Create events with name, date, time, location, and description.
View Events: Display events in a responsive list format.
Edit & Delete Events: Modify or remove events easily.

Event Details
Categorize Events: Group events into categories.

Notifications & Reminders
Set Reminders: Notify users for upcoming events.
Browser Notifications: Stay updated with reminders via browser notifications.


🛠️ Tech Stack
Frontend	Backend	Database	Deployment
React	Node.js	MongoDB	Docker
Bootstrap	Express.js	GitHub CI/CD

🚀 Getting Started
Prerequisites
Ensure the following are installed:

Node.js
MongoDB
Express
ReactJS

🐳 Docker Deployment
Build Docker Images
Build the backend image

Frontend: http://localhost:3000
Backend: http://localhost:5000
⚙️ GitHub CI/CD Pipeline
1. GitHub Secrets
Store the following secrets in your GitHub repository:

DOCKER_USERNAME: Your Docker Hub username.
DOCKER_PASSWORD: Your Docker Hub password.

2. CI/CD Workflow
The .github/workflows/docker-deploy.yml file handles:

Building and pushing Docker images to Docker Hub.
Deployment triggers on every push to the master branch.
