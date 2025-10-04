"use strict";(()=>{var e={};e.id=170,e.ids=[170],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,i){return i in t?t[i]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,i)):"function"==typeof t&&"default"===i?t:void 0}}})},4432:(e,t,i)=>{i.r(t),i.d(t,{config:()=>m,default:()=>h,routeModule:()=>f});var r={};i.r(r),i.d(r,{default:()=>g});var o=i(1802),s=i(7153),n=i(6249);let a=require("fs");var l=i.n(a);let u=require("path");var d=i.n(u);let c=()=>{try{let e=d().join(process.cwd(),"data","products.json"),t=l().readFileSync(e,"utf-8");return JSON.parse(t)}catch(e){return console.error("Error loading products:",e),[]}},p=(e,t)=>{let i=e.toLowerCase();if(i.match(/^(hi|hello|hey|good morning|good afternoon)/))return"Hello! \uD83D\uDC4B I'm here to help you with organic gardening and our products. What would you like to know?";if(i.includes("tomato")){let e=t.find(e=>e.title.toLowerCase().includes("tomato")),i=t.find(e=>e.title.toLowerCase().includes("garden and house")),r=t.find(e=>"Potting Soil"===e.category&&e.title.includes("16 Quarts")),o=`Great question about tomatoes! 🍅 Let me share what tomato plants need for success:

**Essential Requirements for Healthy Tomatoes:**

🌞 **Sunlight**
• 6-8 hours of direct sun daily
• More sun = more fruit production

💧 **Water**
• Deep watering 1-2 times per week
• Consistent moisture prevents blossom end rot
• Avoid overhead watering to prevent disease

🌱 **Nutrients**
• Nitrogen for leafy growth (early season)
• Phosphorus for root development
• Potassium for fruit production
• Calcium to prevent blossom end rot
• Regular feeding every 2-3 weeks

🪴 **Soil**
• Well-draining, rich organic matter
• pH 6.0-6.8 (slightly acidic)
• Loose texture for root growth

🌿 **Support & Care**
• Stake or cage plants early
• Prune suckers for better airflow
• Mulch to retain moisture
• Watch for pests and diseases

**Product Recommendations:**

`;return e&&(o+=`1️⃣ **Specialized Tomato Fertilizer** (Best Choice)
   ${e.title.split("–")[0]}
   • Formulated specifically for tomatoes
   • Includes calcium to prevent blossom end rot
   • B-1 Vitamin & Aloe Vera for strong roots
   • Price: $${e.price}
   🛒 [View Product](https://natureswaysoil.com/products/${e.slug})

`),i&&(o+=`2️⃣ **General Purpose Organic Fertilizer**
   ${i.title.split("/")[0]}
   • Works great for tomatoes and all vegetables
   • Fast absorption, easy application
   • Made fresh weekly
   • Price: $${i.price}
   🛒 [View Product](https://natureswaysoil.com/products/${i.slug})

`),r&&(o+=`3️⃣ **Quality Potting Soil** (For containers)
   ${r.title.split(",")[0]}
   • Perfect for container tomatoes
   • Excellent drainage and aeration
   • Rich in organic matter
   • Price: $${r.price}
   🛒 [View Product](https://natureswaysoil.com/products/${r.slug})

`),o+=`**Pro Tips:**
• Start with good soil and consistent watering
• Feed regularly once plants start flowering
• Mulch with straw or compost to retain moisture
• Remove lower leaves to improve air circulation

What specific aspect of tomato growing would you like to know more about?`}if(i.includes("houseplant")||i.includes("house plant")||i.includes("indoor plant")){let e=t.find(e=>e.title.toLowerCase().includes("house plant")||e.title.toLowerCase().includes("garden and house")),i=t.find(e=>"Potting Soil"===e.category&&e.title.includes("8 Quarts")),r=t.find(e=>e.title.toLowerCase().includes("charcoal")),o=`Great question about houseplants! 🪴 Here's what indoor plants need to thrive:

**Essential Care for Healthy Houseplants:**

☀️ **Light Requirements**
• Varies by plant species
• Most need bright, indirect light
• Rotate plants weekly for even growth
• Watch for signs: leggy = too little, burned = too much

💧 **Watering**
• Check soil moisture before watering
• Most prefer soil to dry slightly between waterings
• Use room temperature water
• Ensure pots have drainage holes

🌱 **Nutrition**
• Feed during growing season (spring/summer)
• Reduce feeding in fall/winter
• Liquid fertilizers absorb quickly
• Every 2-4 weeks during active growth

🪴 **Soil & Potting**
• Well-draining potting mix essential
• Repot when roots fill container
• Fresh soil provides nutrients
• Good aeration prevents root rot

🌿 **Environment**
• Most prefer 65-75\xb0F
• Moderate humidity (40-60%)
• Good air circulation
• Keep away from drafts and vents

**Product Recommendations:**

`;return e&&(o+=`1️⃣ **Organic Liquid Fertilizer** (Top Choice)
   ${e.title.split("/")[0]}
   • Perfect for all houseplants
   • Fast absorption through roots and leaves
   • Promotes healthy, vibrant growth
   • Easy to use - just dilute and apply
   • Price: $${e.price}
   🛒 [View Product](https://natureswaysoil.com/products/${e.slug})

`),i&&(o+=`2️⃣ **Premium Potting Soil**
   ${i.title.split(",")[0]}
   • Ideal for repotting houseplants
   • Excellent drainage and aeration
   • Rich in organic nutrients
   • Price: $${i.price}
   🛒 [View Product](https://natureswaysoil.com/products/${i.slug})

`),r&&(o+=`3️⃣ **Activated Charcoal**
   ${r.title.split(",")[0]}
   • Filters toxins and impurities
   • Prevents root rot
   • Perfect for terrariums
   • Improves soil drainage
   • Price: $${r.price}
   🛒 [View Product](https://natureswaysoil.com/products/${r.slug})

`),o+=`**Pro Tips:**
• Less is more with watering - overwatering kills more plants than underwatering
• Clean leaves monthly to improve photosynthesis
• Group plants together to increase humidity
• Start with easy plants like pothos, snake plants, or ZZ plants

What type of houseplants are you growing?`}if(i.includes("seed")&&(i.includes("start")||i.includes("germination"))){let e=t.filter(e=>"Seed Starting Mix"===e.category),i=t.find(e=>e.title.toLowerCase().includes("garden and house")),r=`Excellent question about seed starting! 🌱 Here's everything you need for successful germination:

**Complete Seed Starting Guide:**

📅 **Timing**
• Start 6-8 weeks before last frost for most vegetables
• Check seed packet for specific timing
• Tomatoes, peppers: 6-8 weeks
• Lettuce, herbs: 4-6 weeks
• Squash, cucumbers: 3-4 weeks (or direct sow)

🌱 **Seed Starting Mix**
• Use sterile seed starting mix (not garden soil)
• Lightweight and fine texture
• Excellent drainage prevents damping off
• Disease-free environment

💧 **Moisture**
• Keep soil consistently moist but not waterlogged
• Bottom watering prevents disturbing seeds
• Mist surface gently for tiny seeds
• Cover with humidity dome until germination

☀️ **Light**
• 12-16 hours of light daily after germination
• Use grow lights 2-3 inches above seedlings
• Natural sunlight often insufficient in early spring
• Rotate trays for even growth

🌡️ **Temperature**
• Most seeds: 65-75\xb0F for germination
• Heat mat speeds germination
• Cool slightly after sprouting (60-70\xb0F)
• Warm-season crops need warmer temps

🌿 **Fertilizing**
• Start feeding when true leaves appear
• Use diluted liquid fertilizer (1/4 strength)
• Feed weekly for strong growth
• Avoid over-fertilizing young seedlings

💪 **Hardening Off**
• Gradually expose to outdoor conditions
• Start 7-10 days before transplanting
• Increase outdoor time daily
• Protect from wind and direct sun initially

**Recommended Products:**

`;return e.length>0&&(r+=`1️⃣ **Organic Seed Starting Mix** (Essential)
   Available in multiple sizes:
`,e.slice(0,3).forEach((e,t)=>{r+=`   • ${e.title.split("-")[0].trim()} - $${e.price}
`}),r+=`   • Sterile and disease-free
   • Perfect drainage for healthy roots
   • Lightweight for easy germination
   🛒 [View All Sizes](https://natureswaysoil.com/products)

`),i&&(r+=`2️⃣ **Organic Liquid Fertilizer** (For feeding seedlings)
   ${i.title.split("/")[0]}
   • Start when true leaves appear
   • Dilute to 1/4 strength for seedlings
   • Promotes strong, healthy growth
   • Includes B-1 for root development
   • Price: $${i.price}
   🛒 [View Product](https://natureswaysoil.com/products/${i.slug})

`),r+=`**Common Mistakes to Avoid:**
• Using garden soil (contains diseases)
• Overwatering (causes damping off)
• Insufficient light (creates leggy seedlings)
• Planting too deep (delays germination)
• Skipping hardening off (transplant shock)

**Pro Tips:**
• Label everything! Seeds look alike
• Start more than you need (some won't germinate)
• Use clean containers with drainage holes
• Keep records of what works for next year

What vegetables or flowers are you planning to start?`}if(i.includes("potting soil")||i.includes("pot soil")){let e=t.filter(e=>"Potting Soil"===e.category);if(e.length>0)return`We offer **Premium Organic Potting Soil** in various sizes! 🌿

Popular sizes:
${e.slice(0,4).map(e=>`• ${e.title.split("-")[0].trim()} - $${e.price}`).join("\n")}

✨ Perfect for:
• Container gardening
• Raised beds
• Repotting houseplants
• All organic growing needs

🛒 [View All Potting Soil Options](https://natureswaysoil.com/products)`}if(i.includes("fertilizer")||i.includes("fertilize")||i.includes("feed")){let e=t.filter(e=>"Fertilizer"===e.category);if(e.length>0)return`Our **Organic Liquid Fertilizers** are made fresh weekly! 🌱

Available options:
${e.map(e=>`• ${e.title.split("-")[0].trim()} - $${e.price}`).join("\n")}

✨ Key benefits:
• Fast absorption
• Promotes healthy growth
• Easy application
• 100% organic
• Includes B-1 Vitamin & Aloe Vera

**Application tip:** Apply every 2-4 weeks during growing season for best results!

🛒 [View All Fertilizers](https://natureswaysoil.com/products)`}return i.includes("organic")&&(i.includes("garden")||i.includes("grow"))?`Organic gardening is wonderful! 🌿 Let me share the complete approach:

**What is Organic Gardening?**
Growing plants using natural methods without synthetic chemicals, pesticides, or fertilizers. It focuses on building healthy soil and working with nature.

**Core Principles:**

🌱 **Build Healthy Soil**
• Add compost and organic matter regularly
• Feed the soil, not just the plants
• Maintain soil pH (6.0-7.0 for most plants)
• Encourage beneficial microorganisms
• Use cover crops in off-season

🐛 **Natural Pest Control**
• Encourage beneficial insects (ladybugs, lacewings)
• Companion planting (marigolds deter pests)
• Hand-pick larger pests
• Use neem oil or insecticidal soap
• Row covers for physical barriers

🌿 **Organic Fertilizers**
• Compost (best all-around amendment)
• Liquid organic fertilizers (fast-acting)
• Worm castings (nutrient-rich)
• Fish emulsion (nitrogen boost)
• Bone meal (phosphorus for roots)
• Kelp meal (trace minerals)

💧 **Water Management**
• Deep, infrequent watering
• Mulch to retain moisture
• Drip irrigation or soaker hoses
• Water in morning to prevent disease
• Collect rainwater when possible

🌾 **Crop Rotation**
• Rotate plant families yearly
• Prevents soil depletion
• Reduces pest and disease buildup
• Improves soil structure

🍂 **Mulching**
• Suppresses weeds naturally
• Retains soil moisture
• Regulates soil temperature
• Adds organic matter as it breaks down
• Use straw, leaves, grass clippings, or wood chips

**Benefits of Organic Gardening:**

✅ **For Your Health**
• No pesticide residues on food
• More nutritious produce
• Safer for children and pets
• Better taste and flavor

✅ **For the Environment**
• Protects water quality
• Supports pollinators and wildlife
• Reduces carbon footprint
• Builds sustainable ecosystems

✅ **For Your Garden**
• Healthier, more resilient plants
• Improved soil over time
• Natural pest balance
• Long-term sustainability

**Getting Started:**

1. **Start Small** - Begin with a few containers or small bed
2. **Test Your Soil** - Know what you're working with
3. **Add Compost** - Foundation of organic gardening
4. **Choose Right Plants** - Native and adapted varieties
5. **Be Patient** - Organic methods take time but last

**Our Organic Products:**

All Nature's Way Soil products are:
✅ 100% organic ingredients
✅ USDA Certified Biobased
✅ Made fresh weekly
✅ No synthetic chemicals
✅ Sustainable and eco-friendly

🛒 [View All Organic Products](https://natureswaysoil.com/products)

**Common Organic Gardening Questions:**
• "How do I deal with pests organically?"
• "What's the best organic fertilizer?"
• "How do I improve my soil naturally?"
• "Can I grow organically in containers?"

What specific aspect of organic gardening would you like to explore?`:i.includes("price")||i.includes("cost")||i.includes("how much")?`Our products range from $20.99 to $29.99 depending on size and type! 💰

**Popular products:**
${t.slice(0,5).map(e=>`• ${e.title.split(",")[0]} - $${e.price}`).join("\n")}

We offer various sizes to fit every garden and budget. Would you like recommendations for a specific need?`:i.includes("ship")||i.includes("deliver")||i.includes("shipping")?`We ship our fresh organic products directly to you! 📦

**Shipping details:**
• Fast processing (products made fresh weekly)
• Secure packaging
• Track your order
• Available nationwide

For specific shipping rates and times, please check at checkout or contact us at natureswaysoil@gmail.com`:i.includes("contact")||i.includes("email")||i.includes("phone")||i.includes("reach")?`We'd love to hear from you! 📧

**Contact us:**
• Email: natureswaysoil@gmail.com
• Website: natureswaysoil.com
• Response time: Usually within 24 hours

You can also use our contact form on the website. How else can I help you today?`:i.includes("what do you sell")||i.includes("what products")||i.includes("show me")?`We offer premium organic gardening products! 🌱

**Our product line:**

🌿 **Liquid Fertilizers**
• General purpose for all plants
• Specialized tomato formula
• Multiple sizes available

🪴 **Potting Soil**
• Premium organic blend
• 8 quarts to 8 cubic feet
• Perfect for containers & raised beds

🌱 **Seed Starting Mix**
• Optimal for germination
• Disease prevention
• Multiple sizes

⚫ **Activated Charcoal**
• Soil conditioning
• Improves drainage
• Filters toxins

🛒 [Browse All Products](https://natureswaysoil.com/products)

What type of gardening are you interested in?`:i.includes("help")||i.includes("confused")||i.includes("not sure")?`I'm here to help! 😊

**I can assist with:**

🌱 Product recommendations
• Best fertilizer for your plants
• Right soil for your project
• Seed starting advice

🌿 Gardening tips
• Organic gardening basics
• Watering & feeding schedules
• Transplanting techniques

📦 Order information
• Pricing & sizes
• Shipping details
• Product availability

What would you like to know more about?`:i.includes("thank")||i.includes("thanks")?`You're very welcome! 😊 Happy gardening! 🌱

Feel free to ask if you have any other questions. We're here to help you grow successfully!`:`I'd be happy to help you with that! 🌱

I can provide information about:
• Our organic products (fertilizers, soils, amendments)
• Gardening tips and best practices
• Product recommendations for your needs
• Pricing and availability

Could you tell me more about what you're looking for? Or try asking:
• "What's best for tomatoes?"
• "How do I start seeds?"
• "What products do you have?"
• "Tell me about organic gardening"`};async function g(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{message:i,history:r}=e.body;if(!i||"string"!=typeof i)return t.status(400).json({error:"Invalid message"});let o=c(),s=p(i,o);return console.log(`Chat - User: ${i.substring(0,50)}... | Bot: ${s.substring(0,50)}...`),t.status(200).json({response:s})}catch(e){return console.error("Chat API error:",e),t.status(500).json({error:"Sorry, I encountered an error. Please try again or contact us at natureswaysoil@gmail.com"})}}let h=(0,n.l)(r,"default"),m=(0,n.l)(r,"config"),f=new o.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/chat",pathname:"/api/chat",bundlePath:"",filename:""},userland:r})},7153:(e,t)=>{var i;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return i}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(i||(i={}))},1802:(e,t,i)=>{e.exports=i(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var i=t(t.s=4432);module.exports=i})();