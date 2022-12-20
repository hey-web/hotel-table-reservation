FROM node:16-alpine3.15 as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:16-alpine3.15 as service
WORKDIR /app
COPY package.json ./
RUN yarn install --production

FROM node:16-alpine3.15
USER 1000
WORKDIR /app
COPY --chown=1000 --from=service /app/node_modules ./node_modules/
COPY --chown=1000 --from=builder /app/dist ./dist/
CMD ["/app/dist/index.js"]
EXPOSE 3000
