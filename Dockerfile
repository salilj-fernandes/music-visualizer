# Use an official Nginx image to serve the build
FROM nginx:alpine

# Copy the React build into Nginx's public folder
COPY build/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
