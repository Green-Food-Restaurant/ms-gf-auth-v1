#!/usr/bin/env bash
set -e

echo "Waiting for database at $DATABASE_HOST:$DATABASE_PORT..."
/opt/wait-for-it.sh "${DATABASE_HOST}:${DATABASE_PORT}"

npm run migration:run
npm run seed:run:relational
npm run start:prod
