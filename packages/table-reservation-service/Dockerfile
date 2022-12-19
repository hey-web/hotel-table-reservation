FROM node:16-alpine3.15 as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:16-alpine3.15
USER 1000
WORKDIR /app
COPY --chown=1000 --from=builder /app .
CMD ["/app/dist/index.js"]
EXPOSE 3000
