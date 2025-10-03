#!/usr/bin/env node

/**
 * Blog Content Generator for Nature's Way Soil
 * Generates natural gardening blog posts with AI assistance
 */

const fs = require('fs');
const path = require('path');

// Natural gardening topics
const topics = [
  'Composting Basics for Beginners',
  'Building Healthy Soil Naturally',
  'Organic Pest Control Methods',
  'Companion Planting Guide',
  'Water Conservation in the Garden',
  'Starting Seeds Indoors',
  'Fall Garden Preparation',
  'Spring Garden Planning',
  'Natural Fertilizers and Amendments',
  'Mulching Techniques for Success',
  'Raised Bed Gardening Tips',
  'Container Gardening Essentials',
  'Attracting Beneficial Insects',
  'Crop Rotation Strategies',
  'Soil pH and Plant Health',
  'Vermicomposting at Home',
  'No-Till Gardening Methods',
  'Heirloom vs Hybrid Seeds',
  'Preserving Your Harvest',
  'Winter Garden Maintenance'
];

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function getRandomTopic() {
  return topics[Math.floor(Math.random() * topics.length)];
}

function createBlogPost(title, content, videoUrl = null) {
  const slug = generateSlug(title);
  const date = getTodayDate();
  const excerpt = content.split('\n\n')[0].substring(0, 150) + '...';

  const frontMatter = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
${videoUrl ? `videoUrl: "${videoUrl}"` : ''}
---

${content}
`;

  const contentDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const filePath = path.join(contentDir, `${slug}.md`);
  fs.writeFileSync(filePath, frontMatter);
  
  console.log(`✅ Blog post created: ${slug}`);
  return { slug, filePath, title, date };
}

// This script is meant to be called by the automation system
// The actual content generation happens via AI in the scheduled task
module.exports = {
  createBlogPost,
  generateSlug,
  getTodayDate,
  getRandomTopic,
  topics
};

// If run directly, create a sample post
if (require.main === module) {
  const sampleTitle = getRandomTopic();
  const sampleContent = `
Welcome to our guide on ${sampleTitle.toLowerCase()}!

## Introduction

Natural gardening is all about working with nature, not against it. In this post, we'll explore practical tips and techniques that will help you succeed in your organic garden.

## Getting Started

The key to success is understanding your soil and local ecosystem. Here are the essential steps:

1. Test your soil pH and composition
2. Add organic matter regularly
3. Choose plants suited to your climate
4. Practice crop rotation
5. Encourage beneficial insects

## Best Practices

Remember that healthy soil equals healthy plants. Focus on building your soil's organic matter content through composting, mulching, and cover cropping.

## Conclusion

By following these natural gardening principles, you'll create a thriving, sustainable garden that produces abundant harvests year after year.

Happy gardening!
`;

  createBlogPost(sampleTitle, sampleContent);
}
