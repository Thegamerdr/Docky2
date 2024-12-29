# Perfume Marketplace Analyzer

This application allows users to compare and analyze perfumes, including their dupes and clones.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (copy `.env.example` to `.env.local` and fill in the values)
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

## Testing

- Run unit tests: `npm test`
- Run end-to-end tests: `npm run cypress`

## Deployment

1. Ensure all environment variables are set in your production environment
2. Run database migrations: `npx prisma migrate deploy`
3. Build the application: `npm run build`
4. Start the production server: `npm start`

## Backup Strategy

We have implemented a backup strategy to ensure data safety:

1. A TypeScript script (`scripts/backup-database.ts`) creates a JSON backup of our mock data and user-generated content.
2. A shell script (`scripts/backup-database.sh`) creates a SQL dump of the production database.
3. The shell script is set up as a daily cron job on the production server.
4. We keep the last 7 days of backups to manage disk space.

To manually create a backup, run:

