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
    if (tomatoProduct) {
      return `For tomatoes, I highly recommend our **${tomatoProduct.title}**! 🍅\n\n✨ Benefits:\n${tomatoProduct.benefits}\n\n💰 Price: $${tomatoProduct.price}\n\nThis formula includes Vitamin B-1 and Aloe Vera for faster root establishment and helps prevent blossom end rot. Perfect for healthy, productive tomato plants!\n\n🛒 [View Product](https://natureswaysoil.com/products/${tomatoProduct.slug})`;
    }
  }

  // Product recommendations - Houseplants
  if (message.includes('houseplant') || message.includes('house plant') || message.includes('indoor plant')) {
    const houseplantProduct = products.find(p => 
      p.title.toLowerCase().includes('house plant') || 
      p.title.toLowerCase().includes('garden and house')
    );
    if (houseplantProduct) {
      return `For houseplants, our **${houseplantProduct.title}** is perfect! 🪴\n\n✨ Benefits:\n${houseplantProduct.benefits}\n\n💰 Price: $${houseplantProduct.price}\n\nIt's 100% organic with fast absorption, promoting healthy growth for all your indoor plants!\n\n🛒 [View Product](https://natureswaysoil.com/products/${houseplantProduct.slug})`;
    }
  }

  // Seed starting
  if (message.includes('seed') && (message.includes('start') || message.includes('germination'))) {
    const seedProducts = products.filter(p => p.category === 'Seed Starting Mix');
    if (seedProducts.length > 0) {
      return `Great question about seed starting! 🌱\n\nWe have **Organic Seed Starting Mix** in multiple sizes:\n\n${seedProducts.slice(0, 3).map(p => `• ${p.title.split('-')[0].trim()} - $${p.price}`).join('\n')}\n\n**Tips for success:**\n• Keep soil consistently moist but not soggy\n• Provide 12-16 hours of light daily\n• Maintain temperature 65-75°F\n• Use our organic mix for better drainage and disease prevention\n\n🛒 [View All Seed Starting Products](https://natureswaysoil.com/products)`;
    }
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
  if (message.includes('organic') && message.includes('garden')) {
    return `Organic gardening is our passion! 🌿\n\n**Why go organic?**\n• Healthier soil ecosystem\n• No synthetic chemicals\n• Better for environment\n• Safer for family & pets\n• Tastier, more nutritious produce\n\n**Our commitment:**\n✅ 100% organic ingredients\n✅ USDA Certified Biobased\n✅ Made fresh weekly\n✅ Sustainable practices\n\nAll our products support natural, healthy plant growth. What specific aspect of organic gardening interests you?`;
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
