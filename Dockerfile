# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20.11.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION} as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for building the application.
FROM base as build

# Copy package files first
COPY package.json package-lock.json ./

# Delete any existing node_modules and package-lock to avoid conflicts
RUN rm -rf node_modules package-lock.json

# Copy package-lock back
COPY package-lock.json ./

# Install ALL dependencies (dev + prod + optional) for building
RUN npm ci --verbose

# Copy the rest of the source files into the image.
COPY . .

# Run the build script.
RUN npm run build

################################################################################
# Create a stage for installing production dependencies only
FROM base as deps

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev --verbose

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM node:${NODE_VERSION}-slim as final

# Use production node environment by default.
ENV NODE_ENV production

# Set working directory
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build


# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD node build/index.js