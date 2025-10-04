import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatRequest {
  message: string;
  history: Message[];
}

// Load product data
const getProducts = () => {
  try {
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const productsData = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(productsData);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

// Knowledge base about Nature's Way Soil
const knowledgeBase = {
  company: {
    name: "Nature's Way Soil",
    specialty: "Organic gardening products",
    values: "100% organic, USDA certified, made fresh weekly",
    contact: "natureswaysoil@gmail.com"
  },
  
  productCategories: {
    fertilizers: "Organic liquid fertilizers for fast absorption and healthy plant growth",
    pottingSoil: "Premium organic potting soil in various sizes for all gardening needs",
    seedStarting: "Specialized organic seed starting mix for optimal germination",
    amendments: "Horticultural activated charcoal for soil conditioning"
  },

  gardeningTips: {
    organic: "Organic gardening uses natural methods without synthetic chemicals, promoting soil health and biodiversity",
    fertilizing: "Apply liquid fertilizer every 2-4 weeks during growing season, diluted according to instructions",
    seedStarting: "Use seed starting mix for better drainage and disease prevention. Keep soil moist but not waterlogged",
    soilHealth: "Healthy soil is the foundation of successful gardening. Add organic matter regularly",
    watering: "Water deeply but less frequently to encourage deep root growth",
    transplanting: "Use B-1 vitamin and aloe vera to reduce transplant shock and establish roots faster"
  }
};

// Simple AI response generator
const generateResponse = (userMessage: string, products: any[]): string => {
  const message = userMessage.toLowerCase();

  // Greeting
  if (message.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
    return "Hello! 👋 I'm here to help you with organic gardening and our products. What would you like to know?";
  }

  // Product recommendations - Tomatoes
  if (message.includes('tomato')) {
    const tomatoProduct = products.find(p => p.title.toLowerCase().includes('tomato'));
    const generalFert = products.find(p => p.title.toLowerCase().includes('garden and house'));
    const pottingSoil = products.find(p => p.category === 'Potting Soil' && p.title.includes('16 Quarts'));
    
    let response = `Great question about tomatoes! 🍅 Let me share what tomato plants need for success:\n\n**Essential Requirements for Healthy Tomatoes:**\n\n🌞 **Sunlight**\n• 6-8 hours of direct sun daily\n• More sun = more fruit production\n\n💧 **Water**\n• Deep watering 1-2 times per week\n• Consistent moisture prevents blossom end rot\n• Avoid overhead watering to prevent disease\n\n🌱 **Nutrients**\n• Nitrogen for leafy growth (early season)\n• Phosphorus for root development\n• Potassium for fruit production\n• Calcium to prevent blossom end rot\n• Regular feeding every 2-3 weeks\n\n🪴 **Soil**\n• Well-draining, rich organic matter\n• pH 6.0-6.8 (slightly acidic)\n• Loose texture for root growth\n\n🌿 **Support & Care**\n• Stake or cage plants early\n• Prune suckers for better airflow\n• Mulch to retain moisture\n• Watch for pests and diseases\n\n**Product Recommendations:**\n\n`;
    
    if (tomatoProduct) {
      response += `1️⃣ **Specialized Tomato Fertilizer** (Best Choice)\n   ${tomatoProduct.title.split('–')[0]}\n   • Formulated specifically for tomatoes\n   • Includes calcium to prevent blossom end rot\n   • B-1 Vitamin & Aloe Vera for strong roots\n   • Price: $${tomatoProduct.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${tomatoProduct.slug})\n\n`;
    }
    
    if (generalFert) {
      response += `2️⃣ **General Purpose Organic Fertilizer**\n   ${generalFert.title.split('/')[0]}\n   • Works great for tomatoes and all vegetables\n   • Fast absorption, easy application\n   • Made fresh weekly\n   • Price: $${generalFert.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${generalFert.slug})\n\n`;
    }
    
    if (pottingSoil) {
      response += `3️⃣ **Quality Potting Soil** (For containers)\n   ${pottingSoil.title.split(',')[0]}\n   • Perfect for container tomatoes\n   • Excellent drainage and aeration\n   • Rich in organic matter\n   • Price: $${pottingSoil.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${pottingSoil.slug})\n\n`;
    }
    
    response += `**Pro Tips:**\n• Start with good soil and consistent watering\n• Feed regularly once plants start flowering\n• Mulch with straw or compost to retain moisture\n• Remove lower leaves to improve air circulation\n\nWhat specific aspect of tomato growing would you like to know more about?`;
    
    return response;
  }

  // Product recommendations - Houseplants
  if (message.includes('houseplant') || message.includes('house plant') || message.includes('indoor plant')) {
    const houseplantProduct = products.find(p => 
      p.title.toLowerCase().includes('house plant') || 
      p.title.toLowerCase().includes('garden and house')
    );
    const pottingSoil = products.find(p => p.category === 'Potting Soil' && p.title.includes('8 Quarts'));
    const charcoal = products.find(p => p.title.toLowerCase().includes('charcoal'));
    
    let response = `Great question about houseplants! 🪴 Here's what indoor plants need to thrive:\n\n**Essential Care for Healthy Houseplants:**\n\n☀️ **Light Requirements**\n• Varies by plant species\n• Most need bright, indirect light\n• Rotate plants weekly for even growth\n• Watch for signs: leggy = too little, burned = too much\n\n💧 **Watering**\n• Check soil moisture before watering\n• Most prefer soil to dry slightly between waterings\n• Use room temperature water\n• Ensure pots have drainage holes\n\n🌱 **Nutrition**\n• Feed during growing season (spring/summer)\n• Reduce feeding in fall/winter\n• Liquid fertilizers absorb quickly\n• Every 2-4 weeks during active growth\n\n🪴 **Soil & Potting**\n• Well-draining potting mix essential\n• Repot when roots fill container\n• Fresh soil provides nutrients\n• Good aeration prevents root rot\n\n🌿 **Environment**\n• Most prefer 65-75°F\n• Moderate humidity (40-60%)\n• Good air circulation\n• Keep away from drafts and vents\n\n**Product Recommendations:**\n\n`;
    
    if (houseplantProduct) {
      response += `1️⃣ **Organic Liquid Fertilizer** (Top Choice)\n   ${houseplantProduct.title.split('/')[0]}\n   • Perfect for all houseplants\n   • Fast absorption through roots and leaves\n   • Promotes healthy, vibrant growth\n   • Easy to use - just dilute and apply\n   • Price: $${houseplantProduct.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${houseplantProduct.slug})\n\n`;
    }
    
    if (pottingSoil) {
      response += `2️⃣ **Premium Potting Soil**\n   ${pottingSoil.title.split(',')[0]}\n   • Ideal for repotting houseplants\n   • Excellent drainage and aeration\n   • Rich in organic nutrients\n   • Price: $${pottingSoil.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${pottingSoil.slug})\n\n`;
    }
    
    if (charcoal) {
      response += `3️⃣ **Activated Charcoal**\n   ${charcoal.title.split(',')[0]}\n   • Filters toxins and impurities\n   • Prevents root rot\n   • Perfect for terrariums\n   • Improves soil drainage\n   • Price: $${charcoal.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${charcoal.slug})\n\n`;
    }
    
    response += `**Pro Tips:**\n• Less is more with watering - overwatering kills more plants than underwatering\n• Clean leaves monthly to improve photosynthesis\n• Group plants together to increase humidity\n• Start with easy plants like pothos, snake plants, or ZZ plants\n\nWhat type of houseplants are you growing?`;
    
    return response;
  }

  // Seed starting
  if (message.includes('seed') && (message.includes('start') || message.includes('germination'))) {
    const seedProducts = products.filter(p => p.category === 'Seed Starting Mix');
    const generalFert = products.find(p => p.title.toLowerCase().includes('garden and house'));
    
    let response = `Excellent question about seed starting! 🌱 Here's everything you need for successful germination:\n\n**Complete Seed Starting Guide:**\n\n📅 **Timing**\n• Start 6-8 weeks before last frost for most vegetables\n• Check seed packet for specific timing\n• Tomatoes, peppers: 6-8 weeks\n• Lettuce, herbs: 4-6 weeks\n• Squash, cucumbers: 3-4 weeks (or direct sow)\n\n🌱 **Seed Starting Mix**\n• Use sterile seed starting mix (not garden soil)\n• Lightweight and fine texture\n• Excellent drainage prevents damping off\n• Disease-free environment\n\n💧 **Moisture**\n• Keep soil consistently moist but not waterlogged\n• Bottom watering prevents disturbing seeds\n• Mist surface gently for tiny seeds\n• Cover with humidity dome until germination\n\n☀️ **Light**\n• 12-16 hours of light daily after germination\n• Use grow lights 2-3 inches above seedlings\n• Natural sunlight often insufficient in early spring\n• Rotate trays for even growth\n\n🌡️ **Temperature**\n• Most seeds: 65-75°F for germination\n• Heat mat speeds germination\n• Cool slightly after sprouting (60-70°F)\n• Warm-season crops need warmer temps\n\n🌿 **Fertilizing**\n• Start feeding when true leaves appear\n• Use diluted liquid fertilizer (1/4 strength)\n• Feed weekly for strong growth\n• Avoid over-fertilizing young seedlings\n\n💪 **Hardening Off**\n• Gradually expose to outdoor conditions\n• Start 7-10 days before transplanting\n• Increase outdoor time daily\n• Protect from wind and direct sun initially\n\n**Recommended Products:**\n\n`;
    
    if (seedProducts.length > 0) {
      response += `1️⃣ **Organic Seed Starting Mix** (Essential)\n   Available in multiple sizes:\n`;
      seedProducts.slice(0, 3).forEach((p, i) => {
        response += `   ${i === 0 ? '•' : '•'} ${p.title.split('-')[0].trim()} - $${p.price}\n`;
      });
      response += `   • Sterile and disease-free\n   • Perfect drainage for healthy roots\n   • Lightweight for easy germination\n   🛒 [View All Sizes](https://natureswaysoil.com/products)\n\n`;
    }
    
    if (generalFert) {
      response += `2️⃣ **Organic Liquid Fertilizer** (For feeding seedlings)\n   ${generalFert.title.split('/')[0]}\n   • Start when true leaves appear\n   • Dilute to 1/4 strength for seedlings\n   • Promotes strong, healthy growth\n   • Includes B-1 for root development\n   • Price: $${generalFert.price}\n   🛒 [View Product](https://natureswaysoil.com/products/${generalFert.slug})\n\n`;
    }
    
    response += `**Common Mistakes to Avoid:**\n• Using garden soil (contains diseases)\n• Overwatering (causes damping off)\n• Insufficient light (creates leggy seedlings)\n• Planting too deep (delays germination)\n• Skipping hardening off (transplant shock)\n\n**Pro Tips:**\n• Label everything! Seeds look alike\n• Start more than you need (some won't germinate)\n• Use clean containers with drainage holes\n• Keep records of what works for next year\n\nWhat vegetables or flowers are you planning to start?`;
    
    return response;
  }

  // Potting soil
  if (message.includes('potting soil') || message.includes('pot soil')) {
    const soilProducts = products.filter(p => p.category === 'Potting Soil');
    if (soilProducts.length > 0) {
      return `We offer **Premium Organic Potting Soil** in various sizes! 🌿\n\nPopular sizes:\n${soilProducts.slice(0, 4).map(p => `• ${p.title.split('-')[0].trim()} - $${p.price}`).join('\n')}\n\n✨ Perfect for:\n• Container gardening\n• Raised beds\n• Repotting houseplants\n• All organic growing needs\n\n🛒 [View All Potting Soil Options](https://natureswaysoil.com/products)`;
    }
  }

  // Fertilizer general
  if (message.includes('fertilizer') || message.includes('fertilize') || message.includes('feed')) {
    const fertProducts = products.filter(p => p.category === 'Fertilizer');
    if (fertProducts.length > 0) {
      return `Our **Organic Liquid Fertilizers** are made fresh weekly! 🌱\n\nAvailable options:\n${fertProducts.map(p => `• ${p.title.split('-')[0].trim()} - $${p.price}`).join('\n')}\n\n✨ Key benefits:\n• Fast absorption\n• Promotes healthy growth\n• Easy application\n• 100% organic\n• Includes B-1 Vitamin & Aloe Vera\n\n**Application tip:** Apply every 2-4 weeks during growing season for best results!\n\n🛒 [View All Fertilizers](https://natureswaysoil.com/products)`;
    }
  }

  // Organic gardening
  if (message.includes('organic') && (message.includes('garden') || message.includes('grow'))) {
    return `Organic gardening is wonderful! 🌿 Let me share the complete approach:\n\n**What is Organic Gardening?**\nGrowing plants using natural methods without synthetic chemicals, pesticides, or fertilizers. It focuses on building healthy soil and working with nature.\n\n**Core Principles:**\n\n🌱 **Build Healthy Soil**\n• Add compost and organic matter regularly\n• Feed the soil, not just the plants\n• Maintain soil pH (6.0-7.0 for most plants)\n• Encourage beneficial microorganisms\n• Use cover crops in off-season\n\n🐛 **Natural Pest Control**\n• Encourage beneficial insects (ladybugs, lacewings)\n• Companion planting (marigolds deter pests)\n• Hand-pick larger pests\n• Use neem oil or insecticidal soap\n• Row covers for physical barriers\n\n🌿 **Organic Fertilizers**\n• Compost (best all-around amendment)\n• Liquid organic fertilizers (fast-acting)\n• Worm castings (nutrient-rich)\n• Fish emulsion (nitrogen boost)\n• Bone meal (phosphorus for roots)\n• Kelp meal (trace minerals)\n\n💧 **Water Management**\n• Deep, infrequent watering\n• Mulch to retain moisture\n• Drip irrigation or soaker hoses\n• Water in morning to prevent disease\n• Collect rainwater when possible\n\n🌾 **Crop Rotation**\n• Rotate plant families yearly\n• Prevents soil depletion\n• Reduces pest and disease buildup\n• Improves soil structure\n\n🍂 **Mulching**\n• Suppresses weeds naturally\n• Retains soil moisture\n• Regulates soil temperature\n• Adds organic matter as it breaks down\n• Use straw, leaves, grass clippings, or wood chips\n\n**Benefits of Organic Gardening:**\n\n✅ **For Your Health**\n• No pesticide residues on food\n• More nutritious produce\n• Safer for children and pets\n• Better taste and flavor\n\n✅ **For the Environment**\n• Protects water quality\n• Supports pollinators and wildlife\n• Reduces carbon footprint\n• Builds sustainable ecosystems\n\n✅ **For Your Garden**\n• Healthier, more resilient plants\n• Improved soil over time\n• Natural pest balance\n• Long-term sustainability\n\n**Getting Started:**\n\n1. **Start Small** - Begin with a few containers or small bed\n2. **Test Your Soil** - Know what you're working with\n3. **Add Compost** - Foundation of organic gardening\n4. **Choose Right Plants** - Native and adapted varieties\n5. **Be Patient** - Organic methods take time but last\n\n**Our Organic Products:**\n\nAll Nature's Way Soil products are:\n✅ 100% organic ingredients\n✅ USDA Certified Biobased\n✅ Made fresh weekly\n✅ No synthetic chemicals\n✅ Sustainable and eco-friendly\n\n🛒 [View All Organic Products](https://natureswaysoil.com/products)\n\n**Common Organic Gardening Questions:**\n• "How do I deal with pests organically?"\n• "What's the best organic fertilizer?"\n• "How do I improve my soil naturally?"\n• "Can I grow organically in containers?"\n\nWhat specific aspect of organic gardening would you like to explore?`;
  }

  // Pricing
  if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
    return `Our products range from $20.99 to $29.99 depending on size and type! 💰\n\n**Popular products:**\n${products.slice(0, 5).map(p => `• ${p.title.split(',')[0]} - $${p.price}`).join('\n')}\n\nWe offer various sizes to fit every garden and budget. Would you like recommendations for a specific need?`;
  }

  // Shipping
  if (message.includes('ship') || message.includes('deliver') || message.includes('shipping')) {
    return `We ship our fresh organic products directly to you! 📦\n\n**Shipping details:**\n• Fast processing (products made fresh weekly)\n• Secure packaging\n• Track your order\n• Available nationwide\n\nFor specific shipping rates and times, please check at checkout or contact us at natureswaysoil@gmail.com`;
  }

  // Contact
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
    return `We'd love to hear from you! 📧\n\n**Contact us:**\n• Email: natureswaysoil@gmail.com\n• Website: natureswaysoil.com\n• Response time: Usually within 24 hours\n\nYou can also use our contact form on the website. How else can I help you today?`;
  }

  // Product list
  if (message.includes('what do you sell') || message.includes('what products') || message.includes('show me')) {
    return `We offer premium organic gardening products! 🌱\n\n**Our product line:**\n\n🌿 **Liquid Fertilizers**\n• General purpose for all plants\n• Specialized tomato formula\n• Multiple sizes available\n\n🪴 **Potting Soil**\n• Premium organic blend\n• 8 quarts to 8 cubic feet\n• Perfect for containers & raised beds\n\n🌱 **Seed Starting Mix**\n• Optimal for germination\n• Disease prevention\n• Multiple sizes\n\n⚫ **Activated Charcoal**\n• Soil conditioning\n• Improves drainage\n• Filters toxins\n\n🛒 [Browse All Products](https://natureswaysoil.com/products)\n\nWhat type of gardening are you interested in?`;
  }

  // Help/confused
  if (message.includes('help') || message.includes('confused') || message.includes('not sure')) {
    return `I'm here to help! 😊\n\n**I can assist with:**\n\n🌱 Product recommendations\n• Best fertilizer for your plants\n• Right soil for your project\n• Seed starting advice\n\n🌿 Gardening tips\n• Organic gardening basics\n• Watering & feeding schedules\n• Transplanting techniques\n\n📦 Order information\n• Pricing & sizes\n• Shipping details\n• Product availability\n\nWhat would you like to know more about?`;
  }

  // Thank you
  if (message.includes('thank') || message.includes('thanks')) {
    return `You're very welcome! 😊 Happy gardening! 🌱\n\nFeel free to ask if you have any other questions. We're here to help you grow successfully!`;
  }

  // Default response
  return `I'd be happy to help you with that! 🌱\n\nI can provide information about:\n• Our organic products (fertilizers, soils, amendments)\n• Gardening tips and best practices\n• Product recommendations for your needs\n• Pricing and availability\n\nCould you tell me more about what you're looking for? Or try asking:\n• "What's best for tomatoes?"\n• "How do I start seeds?"\n• "What products do you have?"\n• "Tell me about organic gardening"`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history }: ChatRequest = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Load products
    const products = getProducts();

    // Generate response
    const response = generateResponse(message, products);

    // Log conversation for analytics (optional)
    console.log(`Chat - User: ${message.substring(0, 50)}... | Bot: ${response.substring(0, 50)}...`);

    return res.status(200).json({ response });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again or contact us at natureswaysoil@gmail.com' 
    });
  }
}
