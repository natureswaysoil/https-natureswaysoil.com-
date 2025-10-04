# TikTok Video Automation

Automated system for generating educational TikTok videos about Nature's Way Soil products.

## Overview

This automation system creates engaging educational content for TikTok, featuring:
- Product-focused educational scripts
- Professional video generation via Pictory AI
- Automated scheduling (runs daily at 10 AM)
- Performance tracking and analytics

## Files

- `tiktok_automation.py` - Main automation script
- `products.json` - Product database with details for all Nature's Way Soil products
- `branding_config.json` - Brand colors, fonts, and visual identity settings

## Products Covered

1. **Organic Compost** - Premium aged compost for soil enrichment
2. **Worm Castings** - Nutrient-rich organic fertilizer
3. **Mycorrhizal Fungi** - Beneficial fungi for enhanced root growth
4. **Seed Starting Mix** - Specialized blend for germination
5. **Potting Soil** - All-purpose organic potting mix
6. **Garden Soil** - Enriched soil for in-ground gardens

## Features

- **Educational Content**: Each video teaches viewers about organic gardening
- **Product Integration**: Natural product mentions without being overly promotional
- **Professional Quality**: AI-generated videos with consistent branding
- **Automated Workflow**: Runs daily without manual intervention
- **Performance Tracking**: Monitors video generation and success rates

## Requirements

- Python 3.8+
- Pictory API credentials
- OpenAI API key (for script generation)

## Configuration

API credentials are managed through the system's secure configuration:
- Pictory: Client ID and Client Secret
- OpenAI: API Key

## Usage

The automation runs automatically via scheduled task. Manual execution:

```bash
python tiktok_automation.py
```

## Output

Videos are generated and tracked with:
- Educational scripts saved to logs
- Video generation status monitoring
- Performance metrics tracking
- Error logging and reporting

## Schedule

- **Frequency**: Daily
- **Time**: 10:00 AM
- **Videos per run**: 2 products (rotates through product catalog)

## Sales Projections

Based on industry benchmarks for organic gardening content:

### Conservative Scenario (Months 1-2)
- 60 videos/month → 8-15 sales/month
- Average order value: $45
- Monthly revenue: $360-$675

### Moderate Scenario (Months 3-6)
- 60 videos/month → 30-50 sales/month
- Average order value: $50
- Monthly revenue: $1,500-$2,500

### Optimized Scenario (Months 6+)
- 60 videos/month → 80-120 sales/month
- Average order value: $55
- Monthly revenue: $4,400-$6,600

## Success Factors

1. **Consistency**: Daily posting builds audience trust
2. **Quality**: Educational value keeps viewers engaged
3. **Engagement**: Responding to comments boosts visibility
4. **Optimization**: A/B testing hooks and CTAs
5. **Cross-promotion**: Linking to website and other platforms

## Monitoring

Check automation status:
- Scheduled task dashboard
- Video generation logs
- Performance metrics reports

## Support

For issues or questions about the automation system, check the execution logs or contact support.
