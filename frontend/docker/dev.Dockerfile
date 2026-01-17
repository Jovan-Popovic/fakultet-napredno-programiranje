FROM public.ecr.aws/docker/library/node:22-bookworm-slim

RUN npm install -g pnpm@10

# If we don't create the node_modules dir it will be created on volume mount and owned by root.
RUN mkdir /app /app/node_modules /app/.pnpm-store \
    && chown 1000:1000 /app /app/node_modules /app/.pnpm-store

USER 1000

WORKDIR /app
