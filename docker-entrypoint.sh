#!/bin/sh
set -e

echo "Waiting for database connection..."

# Wait for database to be ready (optional additional check)
until node -e "
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});
connection.connect((err) => {
  if (err) {
    console.error('Database not ready yet:', err.message);
    process.exit(1);
  }
  console.log('Database is ready!');
  connection.end();
  process.exit(0);
});
" 2>/dev/null; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Running migrations..."
npm run migration:run:prod

echo "Starting application..."
exec node dist/src/main.js
