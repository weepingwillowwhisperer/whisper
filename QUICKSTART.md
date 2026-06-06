# Quick Start — Get Live in 3 Steps

## Step 1: Stripe Account (5 min)

1. Go to [stripe.com/start](https://stripe.com/start) → Sign up
2. Stripe Dashboard → **Developers** → **API Keys**
3. Copy **Publishable Key** (`pk_test_...`)
4. Copy **Secret Key** (`sk_test_...`)

## Step 2: Local Setup (2 min)

```bash
# Create local env file
cp .env.local.example .env.local

# Open in your editor and paste Stripe keys
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
# STRIPE_SECRET_KEY=sk_test_xxxxx

# Start dev server
npm run dev
# Visit http://localhost:3000
```

**Test Payment:**
- Add a product to cart
- Click "Proceed to checkout"
- Use card: `4242 4242 4242 4242` | Expiry: `12/26` | CVC: `123`
- Should redirect to success page ✓

## Step 3: Deploy to Vercel (3 min)

**Option A: Fastest**
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New** → **Project**
3. Import this repo (create on GitHub first if needed)
4. In "Environment Variables", add both Stripe keys:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY` (mark as secret)
5. Click **Deploy**

**Done!** Your store is live at `yourdomain.vercel.app`

---

## Next: Add Your Domain (Optional)

Once deployed, add your custom domain:
1. Vercel Dashboard → Settings → Domains
2. Add domain (e.g., `willowstore.com`)
3. Update DNS (Vercel shows instructions)

---

## Managing Products

After deployment, edit products without touching code:

1. Open `lib/data.ts`
2. Add/edit products in `whisperProducts` or `willowProducts`
3. Commit and push: `git add lib/data.ts && git commit -m "Update products" && git push`
4. Vercel auto-deploys in ~30 seconds

Example:
```typescript
{
  id: "whisper-new",
  title: "New Guide",
  unit: "Whisper",
  price: 22,
  format: "PDF",
  pages: 30,
  description: "What it does.",
}
```

---

## Live Mode (When Ready)

To accept real payments:

1. Stripe Dashboard → Get your **live** keys (toggle "Live" mode)
2. In Vercel: Update environment variables with live keys
3. Stripe will verify your account first

---

## Done ✓

Your store now has:
- ✅ Products browsable online
- ✅ Shopping cart
- ✅ Stripe checkout (test mode)
- ✅ Order confirmation
- ✅ Auto-deployed on code changes
- ✅ Custom domain support

See `DEPLOYMENT.md` for full setup details and troubleshooting.
