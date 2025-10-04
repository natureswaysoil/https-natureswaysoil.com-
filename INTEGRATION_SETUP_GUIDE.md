# 🚀 Nature's Way Soil - Full Integration Setup Guide

## Overview
This guide will help you set up the complete integration of OpenAI, Resend, and Supabase for your website.

---

## 📋 Prerequisites

You need accounts and API keys for:
- ✅ **OpenAI** - Already configured
- ✅ **Resend** - Already configured  
- ⚠️ **Supabase** - Needs configuration

---

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: natureswaysoil
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your users
5. Click "Create new project" (takes ~2 minutes)

### 1.2 Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL editor
5. Click "Run" or press Ctrl+Enter

This creates all necessary tables:
- `email_subscribers` - Stores newsletter signups
- `chat_messages` - Logs AI chat conversations
- `customer_inquiries` - Tracks customer questions
- `product_reviews` - Stores product reviews

### 1.3 Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these three values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

---

## 🔐 Step 2: Configure Environment Variables

### 2.1 Update Local Environment

Create a `.env.local` file in your project root (copy from `.env.example`):

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Resend Configuration
RESEND_API_KEY=your_resend_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Never commit `.env.local` to Git! It's already in `.gitignore`.

### 2.2 Configure Vercel Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `natureswaysoil` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable with your actual API keys:
   - `OPENAI_API_KEY` = (your OpenAI API key)
   - `RESEND_API_KEY` = (your Resend API key)
   - `NEXT_PUBLIC_SUPABASE_URL` = (your Supabase URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your Supabase anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your Supabase service role key)
5. Make sure to select **Production**, **Preview**, and **Development** for each

---

## 📧 Step 3: Configure Resend Email Domain

### 3.1 Add Your Domain to Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `natureswaysoil.com`
4. Follow the DNS verification steps:
   - Add the provided DNS records to your domain registrar
   - Wait for verification (usually 5-30 minutes)

### 3.2 Update Email Sender

Once verified, update the sender email in `pages/api/subscribe.ts`:

```typescript
from: 'Nature\'s Way Soil <hello@natureswaysoil.com>',
```

**Note**: Until domain is verified, emails will come from `onboarding@resend.dev`

---

## 🤖 Step 4: Activate AI Chat Widget

Replace the old chat widget with the AI-powered version:

### Option A: Replace Completely

In `pages/_app.tsx`, change:
```typescript
import EducationalChatWidget from '../components/EducationalChatWidget';
```
to:
```typescript
import AIEducationalChatWidget from '../components/AIEducationalChatWidget';
```

And update the component:
```typescript
<AIEducationalChatWidget />
```

### Option B: Keep Both (Recommended for Testing)

Add both widgets and test the AI version first:
```typescript
import EducationalChatWidget from '../components/EducationalChatWidget';
import AIEducationalChatWidget from '../components/AIEducationalChatWidget';

// In your return statement:
{/* <EducationalChatWidget /> */}
<AIEducationalChatWidget />
```

---

## 🧪 Step 5: Test Everything

### 5.1 Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test:

1. **Email Subscription**:
   - Enter your email in the capture form
   - Check your inbox for welcome email
   - Verify email appears in Supabase `email_subscribers` table

2. **AI Chat Widget**:
   - Click the chat button (bottom right)
   - Ask: "What makes soil healthy?"
   - Verify you get an AI-powered response
   - Check Supabase `chat_messages` table for logged conversations

3. **Error Handling**:
   - Try subscribing with same email twice
   - Try invalid email format
   - Verify error messages display correctly

### 5.2 Deploy to Production

```bash
git add .
git commit -m "Add full OpenAI, Resend, and Supabase integration"
git push origin main
```

Vercel will automatically deploy. Wait 2-3 minutes, then test on live site.

---

## 📊 Step 6: Monitor Your Integrations

### Supabase Dashboard
- **Table Editor**: View all stored data
- **SQL Editor**: Run custom queries
- **Logs**: Monitor API calls and errors

### Resend Dashboard
- **Emails**: See all sent emails
- **Logs**: Track delivery status
- **Analytics**: Monitor open rates

### OpenAI Usage
- Go to [OpenAI Usage](https://platform.openai.com/usage)
- Monitor API calls and costs
- Set up usage alerts

---

## 🎯 What's Working Now

### ✅ Email Capture & Automation
- Visitors can subscribe to your newsletter
- Automatic welcome email with soil health tips
- 15% discount code included
- All emails stored in Supabase
- Duplicate email prevention

### ✅ AI-Powered Chat Widget
- Real-time soil health education
- Powered by GPT-4
- Conversational and educational (not sales-focused)
- All conversations logged for insights
- Quick question suggestions

### ✅ Data Storage
- Email subscribers tracked
- Chat conversations logged
- Customer inquiries stored
- Ready for product reviews

---

## 🚀 Next Steps & Enhancements

### Immediate Actions
1. ✅ Set up Supabase (follow Step 1)
2. ✅ Add Supabase credentials to Vercel (Step 2.2)
3. ✅ Verify Resend domain (Step 3)
4. ✅ Deploy and test (Step 5)

### Future Enhancements
- **Email Sequences**: Set up automated email courses
- **Customer Segmentation**: Tag subscribers by interests
- **Chat Analytics**: Analyze common questions
- **Product Recommendations**: AI suggests products based on chat
- **Review Collection**: Automated review request emails
- **Abandoned Cart**: Email reminders for incomplete purchases

---

## 🆘 Troubleshooting

### Email Not Sending
- Check Resend API key in Vercel environment variables
- Verify domain is verified in Resend dashboard
- Check Resend logs for error messages

### AI Chat Not Responding
- Verify OpenAI API key is correct
- Check OpenAI usage limits
- Look for errors in browser console (F12)
- Check Vercel function logs

### Supabase Connection Errors
- Verify all three Supabase credentials are set
- Check Supabase project is active
- Verify RLS policies are set correctly
- Check Supabase logs for errors

### General Debugging
```bash
# Check local environment variables
cat .env.local

# View Vercel logs
vercel logs

# Test API endpoints directly
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 💰 Cost Estimates

### OpenAI (GPT-4o-mini)
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- **Estimated**: $5-20/month for typical traffic

### Resend
- Free tier: 3,000 emails/month
- **Estimated**: $0/month (unless you exceed free tier)

### Supabase
- Free tier: 500MB database, 2GB bandwidth
- **Estimated**: $0/month (unless you exceed free tier)

**Total Estimated Cost**: $5-20/month

---

## 📞 Support

If you need help:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check Supabase and Resend dashboards
4. Contact me for assistance

---

## 🎉 Congratulations!

Once set up, you'll have:
- ✅ Automated email marketing with welcome sequences
- ✅ AI-powered customer education
- ✅ Complete data tracking and analytics
- ✅ Professional, conversion-optimized website

Your website is now a powerful conversion machine! 🚀🌱
