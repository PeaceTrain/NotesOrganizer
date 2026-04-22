FROM node:22-alpine
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate && pnpm install
RUN pnpm --filter @inkforge/web build
EXPOSE 3000
CMD ["pnpm", "--filter", "@inkforge/web", "start"]
