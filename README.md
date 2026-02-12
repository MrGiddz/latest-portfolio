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

## Contact Form Email Setup

The `/contact` form posts to `POST /api/contact` and sends mail over SMTP.
Set these variables in your local `.env` and deployment environment:

```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
MAIL_TO=you@yourdomain.com
# Optional override for sender header (defaults to SMTP_USER)
MAIL_FROM=no-reply@yourdomain.com
```

Notes:
- Use `SMTP_SECURE=true` when your provider expects implicit TLS (often port `465`).
- Use `SMTP_SECURE=false` for STARTTLS (often port `587`).
- Keep `.env` private; it is git-ignored.

## SEO Generators

This project generates SEO machine-readable resources with App Router routes:

- `GET /robots.txt` from `app/robots.ts`
- `GET /sitemap.xml` from `app/sitemap.ts`
- `GET /llms.txt` from `app/llms.txt/route.ts`
- `GET /llms-full.txt` from `app/llms-full.txt/route.ts`

The sitemap includes static routes, blog post URLs, and machine-readable endpoints.

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
