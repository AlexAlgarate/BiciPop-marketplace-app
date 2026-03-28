FROM node:22-alpine

RUN apk add --no-cache openssl

RUN corepack enable pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
RUN pnpm prisma:generate

COPY . .

RUN pnpm build 

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["pnpm", "start"]
