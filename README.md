This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Auth / DB environment variables

Create `.env.local` with values below for signup/login:

```bash
JWT_SECRET=your-long-random-secret
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=mohaeng
```

Expected MySQL table (`USER`):

```sql
CREATE TABLE `USER` (
  USER_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
  EMAIL VARCHAR(100) NOT NULL UNIQUE,
  USER_PWD VARCHAR(255) NULL,
  NAME VARCHAR(50) NOT NULL,
  PHONE VARCHAR(20) NULL,
  PROFILE_IMG VARCHAR(255) NULL,
  USER_TYPE VARCHAR(20) NOT NULL,
  BUSINESS_NUM VARCHAR(20) NULL,
  SIGNUP_TYPE VARCHAR(20) NOT NULL,
  USER_ROLE VARCHAR(20) NOT NULL,
  STATUS VARCHAR(20) NOT NULL,
  CREATED_AT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UPDATED_AT DATETIME NULL,
  LAST_LOGIN_AT DATE NOT NULL DEFAULT CURRENT_DATE,
  WITHREASON_ID INT NULL,
  WITHDRAWAL_REASON TEXT NULL
);
```

Default values used by the app for basic signup: `USER_TYPE=PERSONAL`, `SIGNUP_TYPE=BASIC`, `USER_ROLE=USER`, `STATUS=ACTIVE`.
