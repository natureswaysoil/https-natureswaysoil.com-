# Quick Supabase Setup

## Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Name: `natureswaysoil`
4. Create a strong database password
5. Choose your region
6. Click "Create new project"

## Step 2: Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Click "New Query"
3. Copy and paste the entire `supabase-schema.sql` file
4. Click "Run"

## Step 3: Get Your Credentials
1. Go to Settings → API
2. Copy these three values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJ...`
   - **service_role key**: `eyJ...`

## Step 4: Add to Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = (your project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)
3. Select Production, Preview, and Development
4. Save

## Step 5: Update Local .env.local
Replace the placeholder values in `.env.local` with your actual Supabase credentials.

## Step 6: Redeploy
Push any change to trigger a new deployment, or use Vercel's "Redeploy" button.

## Done! 🎉
Your website now has:
- ✅ AI-powered chat (OpenAI)
- ✅ Automated emails (Resend)
- ✅ Data storage (Supabase)
