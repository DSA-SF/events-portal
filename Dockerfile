# Base container for simple commands
FROM --platform=linux/amd64 node:16-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .

# Install deps
FROM --platform=linux/amd64 node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile
COPY . .

# Create production build
FROM --platform=linux/amd64 node:16-alpine AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn run build && yarn cache clean && npm prune --production
RUN apk update && apk add curl bash && rm -rf /var/lib/apt/lists/*
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin
RUN /usr/local/bin/node-prune

# Production Image
FROM --platform=linux/amd64 node:16-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER nextjs

CMD  node_modules/.bin/next start -p $PORT
