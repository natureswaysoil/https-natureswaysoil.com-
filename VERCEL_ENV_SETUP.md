# Vercel Environment Variables Setup

## Required Environment Variables

To complete the deployment with all integrations working, you need to add these environment variables to your Vercel project:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 2. Select Your Project
Navigate to: natureswaysoil-website

### 3. Go to Settings > Environment Variables

### 4. Add the Following Variables:

#### OpenAI Configuration
```
OPENAI_API_KEY=<your-openai-api-key>
```
**Note**: Use the OpenAI API key you provided earlier

#### Resend Configuration
```
RESEND_API_KEY=<your-resend-api-key>
```
**Note**: Use the Resend API key you provided earlier

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
```
**Note**: Use the Supabase credentials you provided earlier

### 5. Environment Selection
For each variable, select:
- ✅ Production
- ✅ Preview
- ✅ Development

### 6. Redeploy
After adding all variables, trigger a new deployment by:
- Going to the Deployments tab
- Click the three dots (...) on the latest deployment
- Select "Redeploy"

## What This Enables

Once deployed with these environment variables:

✅ **AI Educational Chat Widget** - Powered by OpenAI GPT-4
✅ **Email Subscriptions** - Sent via Resend
✅ **Data Storage** - Chat history and subscriptions stored in Supabase
✅ **Analytics** - Track user interactions and conversions

## Testing After Deployment

1. Visit your live site
2. Test the email capture form
3. Try the educational chat widget
4. Check Supabase dashboard for stored data
5. Check Resend dashboard for sent emails

## Security Note

These environment variables are:
- ✅ Stored securely in Vercel
- ✅ Not committed to git
- ✅ Only accessible during build and runtime
- ✅ Encrypted at rest

---

**Status**: Ready to deploy with full integration
**Next Step**: Add environment variables to Vercel and redeploy
