name: Docker Build and Push

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Debugging - Check Docker version
      run: docker --version

    - name: Debugging - List files in the backend directory
      run: ls -al ./backend

    - name: Build Docker image
      run: |
        docker build --no-cache -t ${{ secrets.DOCKER_USERNAME }}/event-management-backend:latest ./backend

    - name: Push Docker image
      run: |
        docker push ${{ secrets.DOCKER_USERNAME }}/event-management-backend:latest
