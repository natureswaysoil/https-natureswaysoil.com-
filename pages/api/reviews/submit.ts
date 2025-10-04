import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, rating, title, comment, name, email, verified } = req.body;

    if (!productId || !rating || !comment || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const review = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId,
      rating: parseInt(rating),
      title,
      comment,
      name,
      email,
      verified: verified || false,
      helpful: 0,
      createdAt: new Date().toISOString(),
      approved: true // Auto-approve for now, you can add moderation later
    };

    // Store review in JSON file (in production, use a database)
    const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');
    
    let reviews = [];
    if (fs.existsSync(reviewsPath)) {
      const fileContent = fs.readFileSync(reviewsPath, 'utf-8');
      reviews = JSON.parse(fileContent);
    }

    reviews.push(review);
    fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));

    return res.status(200).json({ 
      success: true, 
      message: 'Review submitted successfully!',
      review 
    });

  } catch (error) {
    console.error('Review submission error:', error);
    return res.status(500).json({ error: 'Failed to submit review. Please try again.' });
  }
}
