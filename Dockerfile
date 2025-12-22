ARG BASE_IMAGE

FROM $BASE_IMAGE AS build

WORKDIR /app

COPY . .

RUN bun run build-client

RUN bun run build-server

CMD ["sh", "-c", "bun run ssr"]