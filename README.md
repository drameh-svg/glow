# Glow Gadget landing page

Vercel-ready Next.js landing page with email capture and optional Meta Pixel support.

## Local development

1. Run `npm install`
2. Copy `.env.example` to `.env.local`
3. Add a Resend API key and the inbox that should receive signups
4. Run `npm run dev`

In development, the form returns a success state even without Resend credentials and logs the signup to the terminal. In production, credentials are required so no visitor is shown a false success message.

## Vercel

Import this folder into Vercel and add the variables from `.env.example` under **Project Settings → Environment Variables**.

To add Meta tracking later, set `NEXT_PUBLIC_META_PIXEL_ID`. The page automatically records `PageView` and sends a `Lead` event after a successful signup.
