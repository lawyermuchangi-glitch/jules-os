# JULEX OS

An AI-assisted practice management platform for Kenyan advocates: an AI legal
assistant, a Bill of Costs calculator (Advocates Remuneration Order, Schedule
6), a court fee estimator, AI-assisted document drafting, matter management,
a trust ledger, and credit-based billing via M-Pesa and Stripe.

Built with Next.js 14 (App Router), Supabase (Postgres + Auth), the
Anthropic API, Stripe, and Safaricom's Daraja API.

## 1. Prerequisites

- Node.js 18.18+ and npm
- A free [Supabase](https://supabase.com) project
- An [Anthropic API key](https://console.anthropic.com)
- A [Stripe](https://dashboard.stripe.com) account (test mode is fine to start)
- Safaricom Daraja API credentials — [developer.safaricom.co.ke](https://developer.safaricom.co.ke) (sandbox is free; production requires a registered paybill/till and a signed agreement with Safaricom)

## 2. Install

```bash
npm install
cp .env.example .env.local
```

Fill in every value in `.env.local`. Do not commit this file.

## 3. Set up Supabase

1. Create a new Supabase project.
2. Open the SQL Editor and run the full contents of `supabase/schema.sql`.
   This creates all tables, row-level security policies, and the
   `increment_balance` / `decrement_balance` helper functions, and wires up
   a trigger that gives every new signup a KES 500 free credit.
3. Copy the Project URL and the `anon` and `service_role` keys from
   Project Settings → API into `.env.local`.
4. In Authentication → URL Configuration, add your site URL and
   `/auth/callback` as a redirect URL.

## 4. Set up Stripe

1. Get your test (or live) secret and publishable keys from the Stripe
   dashboard and add them to `.env.local`.
2. Create a webhook endpoint pointing at
   `https://your-domain.co.ke/api/payments/stripe/webhook`, listening for
   `checkout.session.completed`, and copy the signing secret into
   `STRIPE_WEBHOOK_SECRET`.
3. While developing locally, use the Stripe CLI:
   `stripe listen --forward-to localhost:3000/api/payments/stripe/webhook`

## 5. Set up M-Pesa (Daraja)

1. Create an app on the Daraja portal to get a sandbox Consumer Key/Secret.
2. For sandbox testing, use shortcode `174379` and the sandbox passkey
   published in the Daraja docs.
3. Set `MPESA_CALLBACK_URL` to a **publicly reachable** HTTPS URL — Safaricom
   cannot call `localhost`. Use a tunnel (e.g. `ngrok http 3000`) while
   developing, and your real domain in production.
4. Going live requires Safaricom to approve your production shortcode and
   swap `MPESA_ENV=production` with production credentials — this is a
   business process with Safaricom, not just a config change.

## 6. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 7. Deploy

The app deploys cleanly to [Vercel](https://vercel.com):

```bash
npm i -g vercel
vercel
```

Add every variable from `.env.local` to the Vercel project's Environment
Variables, then set `NEXT_PUBLIC_APP_URL` to your production domain and
redeploy. Update the Stripe webhook and M-Pesa callback URLs to point at
the production domain.

## Notes on legal accuracy

- The Bill of Costs calculator (`lib/bill-of-costs.ts`) implements the
  party-and-party instruction fee bands published in the 24th Annual
  Supplement (31 December 2022) to the Advocates (Remuneration) Order.
  The Order is amended periodically by the Chief Justice on the Law
  Society of Kenya's recommendation — always confirm the currently
  gazetted figures at [kenyalaw.org](https://kenyalaw.org) before relying
  on a bill for taxation.
- The Court Fee Estimator (`lib/court-fees.ts`) is explicitly an
  **indicative** budgeting tool, not the authoritative fee schedule. Link
  out to the Judiciary's official Court Fees Assessment Schedule for exact
  figures.
- The AI Assistant and Document Drafting modules are drafting aids. The
  system prompts instruct Claude to avoid inventing citations and to flag
  uncertainty rather than guess — but the instructing advocate remains
  responsible for verifying every citation and factual claim before filing
  or sending anything downstream.

## What still needs your input before this is production-ready

- Real Supabase, Anthropic, Stripe, and Safaricom credentials (all fields
  in `.env.example`).
- A production M-Pesa paybill/till number, which requires a Safaricom
  business agreement — this cannot be automated.
- Legal review of the AI-generated document templates and system prompts
  by you or Elizabeth before advocates rely on them for filing.
- Your firm's actual Terms of Service, Privacy Policy, and Disclaimer
  pages (currently linked in the footer but not yet drafted).
