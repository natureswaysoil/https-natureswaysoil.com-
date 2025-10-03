# Natural Gardening Blog & Video Automation

## Overview
This system automatically generates and publishes natural gardening blog posts with accompanying videos every other day (48 hours).

## Features
- 🌱 AI-generated blog posts on natural gardening topics
- 🎥 Automated video creation using Runway ML or Pictory
- 📅 Scheduled publishing every other day
- 🚀 Automatic deployment to natureswaysoil.com

## File Structure
```
pages/blog/
  ├── index.tsx          # Blog listing page
  └── [slug].tsx         # Individual blog post page

content/blog/
  └── *.md               # Generated blog posts (markdown with frontmatter)

scripts/automation/
  ├── generate-blog-content.js    # Blog post generator
  └── video-config.json           # Video generation settings
```

## Blog Post Format
Each blog post is a markdown file with frontmatter:

```markdown
---
title: "Your Blog Post Title"
date: "2025-10-03"
excerpt: "Brief description..."
videoUrl: "https://youtube.com/embed/..."
---

Your blog content here...
```

## Scheduled Task
The automation runs every 48 hours and:
1. Generates a new blog post on a natural gardening topic
2. Creates an accompanying video (60-90 seconds)
3. Commits changes to GitHub
4. Triggers Vercel deployment

## Environment Variables Required
```
# GitHub (for automated commits)
GITHUB_TOKEN=your_github_token

# Video Generation (choose one)
RUNWAY_API_KEY=your_runway_key
# OR
PICTORY_API_KEY=your_pictory_key
PICTORY_CLIENT_ID=your_client_id
PICTORY_CLIENT_SECRET=your_client_secret

# OpenAI (for content generation)
OPENAI_API_KEY=your_openai_key
```

## Manual Testing
To test blog generation locally:
```bash
npm run generate-blog
```

## Deployment
The site uses Vercel for hosting. Any push to the main branch triggers automatic deployment.

## Topics Covered
- Composting and soil health
- Organic pest control
- Companion planting
- Water conservation
- Seasonal gardening tips
- Natural fertilizers
- And 15+ more topics!

## Support
For issues or questions, contact the development team.
