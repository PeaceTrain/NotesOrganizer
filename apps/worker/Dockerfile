FROM node:22-alpine
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate && pnpm install
CMD ["pnpm", "--filter", "@inkforge/worker", "dev"]
