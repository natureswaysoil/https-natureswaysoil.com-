import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, type } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || 'Nature\'s Way Soil <no-reply@natureswaysoil.com>';
    
    // Determine recipient based on type
    let to: string;
    if (type === 'sales') {
      to = process.env.SALES_TO || 'sales@natureswaysoil.com';
    } else if (type === 'james') {
      to = process.env.JAMES_TO || 'james@natureswaysoil.com';
    } else {
      to = process.env.SUPPORT_TO || 'support@natureswaysoil.com,sales@natureswaysoil.com';
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: to.split(','),
        subject: subject || `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #16a34a;">New Contact Form Submission</h2>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Type:</strong> ${type || 'general'}</p>
              ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            </div>
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="white-space: pre-wrap; color: #4b5563;">${message}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Reply directly to this email to respond to ${name} at ${email}
              </p>
            </div>
          </div>
        `,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(500).json({ error: 'Failed to send email', details: data });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
