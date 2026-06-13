# Deployment & Setup Guide

## Overview

This guide covers:
1. Setting up Stripe payments (local development & production)
2. Deploying to Vercel
3. Managing products (JSON-based for now)

---

## 1. Stripe Setup

### Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in
3. Click **Developers** → **API Keys**
4. You'll see:
   - **Publishable Key** (`pk_test_...`)
   - **Secret Key** (`sk_test_...`)

### Local Development

1. Copy `.env.local.example` → `.env.local`
2. Paste your Stripe keys:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
3. Test locally at `http://localhost:3000`

**Test Cards (Stripe):**
- Visa: `4242 4242 4242 4242`
- Any expiry: `12/26`
- Any CVC: `123`

### Production (Vercel)

1. Get your **live keys** from Stripe (flip toggle from "Test" to "Live")
2. In Vercel dashboard:
   - Project settings → Environment Variables
   - Add both keys as environment variables
   - Leave `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` as public
   - Mark `STRIPE_SECRET_KEY` as private (not visible to client)

---

## 2. Vercel Deployment

### Option A: GitHub + Vercel (Recommended)

1. **Create GitHub Repo:**
   ```bash
   git remote add origin https://github.com/yourusername/willow-pdf-store.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repo
   - Vercel auto-detects Next.js
   - Add environment variables (step from above)
   - Click Deploy

3. **Custom Domain:**
   - In Vercel: Settings → Domains
   - Add your domain (e.g., `willow-pdf-store.com`)
   - Follow DNS instructions

### Option B: Deploy from CLI

```bash
npm install -g vercel
vercel
# Follow prompts, paste your environment variables
```

---

## 3. Managing Products

### Current Setup
Products are stored in `lib/data.ts`. To update:

1. Edit `lib/data.ts`:
   - **Willow products**: Add to `willowProducts` array
   - **Whisper products**: Add to `whisperProducts` array

2. Commit and push:
   ```bash
   git add lib/data.ts
   git commit -m "Update products"
   git push
   ```

3. Vercel auto-deploys on push

### Product Structure

```typescript
{
  id: "unique-id",
  title: "Product Name",
  unit: "Whisper",           // or pillar: "Nest" etc
  price: 29,                 // in USD
  format: "PDF Guide",
  pages: 32,
  tag: "Popular",            // optional
  description: "Short description...",
}
```

### Adding Products

1. Open `lib/data.ts`
2. Add to `whisperProducts` or `willowProducts`:
   ```typescript
   {
     id: "whisper-new-product",
     title: "New Product Name",
     unit: "Whisper",
     price: 25,
     format: "Digital Guide",
     pages: 24,
     description: "What this product does...",
   }
   ```
3. Commit & push → auto-deployed in ~30 seconds

### Future: Admin Panel
For easier product management without code, we can add:
- A simple web admin panel (database needed)
- Google Sheets integration (free, no database)
- Airtable sync (no-code option)

---

## 4. After Going Live

### Stripe Webhook (Optional but Recommended)

Webhooks let Stripe notify your app of payment success/failure:

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret
5. Add to Vercel: `STRIPE_WEBHOOK_SECRET=whsec_...`

### Fulfillment (Sending PDFs)

Currently, customers get success page. To send PDFs:

**Option 1: Manual**
- Check Stripe dashboard for orders
- Email PDFs to customers

**Option 2: Automated**
- Gumroad, Lemon Squeezy, or Stripe + email service
- We can integrate this later

### Analytics & Monitoring

- **Stripe Dashboard**: View sales, customers, revenue
- **Vercel Analytics**: View traffic and performance
- **Email**: Set up order notifications

---

## 5. Checklist

- [ ] Create Stripe account
- [ ] Get test and live keys
- [ ] Create GitHub repo
- [ ] Deploy to Vercel
- [ ] Add environment variables
- [ ] Test checkout with test card
- [ ] Flip Stripe to live mode
- [ ] Set custom domain
- [ ] Monitor first orders

---

## 6. Troubleshooting

**"Stripe key not found"**
- Check `.env.local` (for local dev)
- Check Vercel Environment Variables (for production)
- Restart dev server: `npm run dev`

**"Checkout fails silently"**
- Open browser console (F12)
- Check Network tab for API errors
- Verify Stripe publishable key is correct

**"Products don't show after update"**
- Vercel needs 30-60 seconds to rebuild
- Check build logs in Vercel dashboard

**"Domain not working"**
- DNS changes can take 24-48 hours
- Vercel shows current status under Domains

---

## Questions?

- [Stripe Docs](https://stripe.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
