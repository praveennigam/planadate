# planadate

A romantic date invitation wizard — plan the perfect date, send a beautiful email, and attach a personalized PDF love letter.

## Features

- Multi-step date planning wizard
- Email notification with date details
- Auto-generated PDF love letter
- Gmail SMTP support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFY_EMAIL=your-email@gmail.com
```

## Deploy

Deploy on [Vercel](https://vercel.com) or any Node.js hosting platform.
