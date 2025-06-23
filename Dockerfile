# build
FROM node:18-alpine AS builder

# working directory in the contenair
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY src ./src

RUN npm run build

# production
FROM node:18-alpine AS production

RUN npm install pm2 -g


WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY ecosystem.config.js ./

RUN mkdir -p logs \
    && addgroup -g 1001 -S nodejs \
    && adduser -u 1001 -S nodejs -G nodejs \
    && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/status', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# run the application with PM2
CMD  ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]