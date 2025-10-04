import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId } = req.query;

    const reviewsPath = path.join(process.cwd(), 'data', 'reviews.json');
    
    if (!fs.existsSync(reviewsPath)) {
      return res.status(200).json({ reviews: [], stats: { average: 0, total: 0 } });
    }

    const fileContent = fs.readFileSync(reviewsPath, 'utf-8');
    const allReviews = JSON.parse(fileContent);

    const productReviews = allReviews.filter(
      (review: any) => review.productId === productId && review.approved
    );

    const stats = {
      total: productReviews.length,
      average: productReviews.length > 0 
        ? productReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / productReviews.length 
        : 0,
      distribution: {
        5: productReviews.filter((r: any) => r.rating === 5).length,
        4: productReviews.filter((r: any) => r.rating === 4).length,
        3: productReviews.filter((r: any) => r.rating === 3).length,
        2: productReviews.filter((r: any) => r.rating === 2).length,
        1: productReviews.filter((r: any) => r.rating === 1).length,
      }
    };

    return res.status(200).json({ 
      reviews: productReviews.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      stats 
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
