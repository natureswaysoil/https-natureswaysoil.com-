# Email Configuration with Resend

## Overview
This website uses [Resend](https://resend.com) for transactional email delivery through the contact form.

## Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

```env
RESEND_API_KEY=re_hXVajDaY_KkGLGbN64YkjA3kQ2LXprTBT
RESEND_FROM="Nature's Way Soil <no-reply@natureswaysoil.com>"
SUPPORT_TO="support@natureswaysoil.com,sales@natureswaysoil.com"
SALES_TO="sales@natureswaysoil.com"
JAMES_TO="james@natureswaysoil.com"
```

## How It Works

### Contact Form Routes
- **General Support** → Sends to `SUPPORT_TO` (support@natureswaysoil.com, sales@natureswaysoil.com)
- **Sales Inquiry** → Sends to `SALES_TO` (sales@natureswaysoil.com)
- **Message James** → Sends to `JAMES_TO` (james@natureswaysoil.com)

### Email Features
- ✅ Professional HTML email templates
- ✅ Reply-to automatically set to customer's email
- ✅ Form validation (name, email, message required)
- ✅ Multiple recipient support
- ✅ Department-based routing
- ✅ Success/error feedback to users

## Setting Up Email Addresses

### Option 1: Use Resend Email Forwarding (Recommended)
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain: `natureswaysoil.com`
3. Verify DNS records (MX, TXT, CNAME)
4. Create email addresses:
   - `support@natureswaysoil.com`
   - `sales@natureswaysoil.com`
   - `james@natureswaysoil.com`
   - `no-reply@natureswaysoil.com`
5. Set up forwarding to your personal email (e.g., natureswaysoil@gmail.com)

### Option 2: Use Your Current Email Provider
If you already have email hosting (Gmail, Outlook, etc.):
1. Keep using Resend for sending only
2. Set up email forwarding from your provider
3. Or manually check the inboxes

## Testing the Contact Form

1. Visit: `https://natureswaysoil.com/contact`
2. Fill out the form
3. Check the recipient email inbox
4. Reply directly to the email (it will go to the customer)

## Troubleshooting

### Emails Not Sending
- Check Resend API key is correct in Vercel env vars
- Verify domain is verified in Resend dashboard
- Check Resend logs: https://resend.com/emails

### Emails Going to Spam
- Complete domain verification (SPF, DKIM, DMARC)
- Use a real email address for `RESEND_FROM` (not no-reply@)
- Warm up your domain by sending gradually

### Want Replies in Your Inbox?
Change `RESEND_FROM` to:
```env
RESEND_FROM="Nature's Way Soil <support@natureswaysoil.com>"
```
Then make sure `support@natureswaysoil.com` is a real mailbox you can access.

## API Endpoint

**POST** `/api/contact`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Question",
  "message": "I have a question about...",
  "type": "support" // or "sales" or "james"
}
```

Response:
```json
{
  "success": true,
  "id": "email_id_from_resend"
}
```

## Next Steps

1. ✅ Add environment variables to Vercel
2. ✅ Verify domain in Resend dashboard
3. ✅ Set up email forwarding
4. ✅ Test the contact form
5. ✅ Monitor Resend dashboard for delivery status

## Support

- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
