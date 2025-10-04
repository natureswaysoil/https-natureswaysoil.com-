import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Add to Resend audience (you'll need to create an audience in Resend dashboard)
    // For now, we'll send a welcome email
    await resend.emails.send({
      from: 'Nature\'s Way Soil <hello@natureswaysoil.com>',
      to: email,
      subject: '🌱 Welcome to Nature\'s Way Soil Family!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #4a7c2c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .discount { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 Welcome ${name || 'Friend'}!</h1>
              <p>Thank you for joining the Nature's Way Soil family</p>
            </div>
            <div class="content">
              <p>Hi ${name || 'there'},</p>
              
              <p>We're thrilled to have you join our community of passionate organic gardeners! At Nature's Way Soil, we believe in working with nature, not against it.</p>
              
              <div class="discount">
                <strong>🎁 Special Welcome Gift:</strong><br>
                Use code <strong>WELCOME10</strong> for 10% off your first order!<br>
                <small>Valid for 7 days</small>
              </div>
              
              <p><strong>What you'll get as a subscriber:</strong></p>
              <ul>
                <li>🌿 Weekly organic gardening tips and tricks</li>
                <li>🎥 Exclusive educational videos</li>
                <li>💰 Subscriber-only discounts and early access to sales</li>
                <li>📅 Seasonal planting guides</li>
                <li>🌱 Product recommendations for your garden</li>
              </ul>
              
              <center>
                <a href="https://natureswaysoil.com/#products" class="button">Shop Now & Save 10%</a>
              </center>
              
              <p><strong>Popular Products to Get Started:</strong></p>
              <ul>
                <li><strong>Organic Potting Soil</strong> - Perfect for containers and raised beds</li>
                <li><strong>Pure Worm Castings</strong> - Nature's perfect fertilizer</li>
                <li><strong>Mycorrhizae Inoculant</strong> - Supercharge your plant roots</li>
              </ul>
              
              <p>Have questions? Just reply to this email - we read every message!</p>
              
              <p>Happy growing! 🌻</p>
              <p><strong>The Nature's Way Soil Team</strong></p>
            </div>
            <div class="footer">
              <p>Nature's Way Soil - Organic Growing Solutions</p>
              <p>You're receiving this because you subscribed at natureswaysoil.com</p>
              <p><a href="https://natureswaysoil.com">Visit Website</a> | <a href="#">Unsubscribe</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Store subscriber in your database (you'll need to set this up)
    // For now, we'll just log it
    console.log('New subscriber:', { email, name, source, timestamp: new Date().toISOString() });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for a welcome gift.' 
    });

  } catch (error) {
    console.error('Email subscription error:', error);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
}
