import { PanjiriVariety, DesiGheeProduct } from '../types';

export const PANJIRI_VARIETIES: PanjiriVariety[] = [
  {
    id: 'classic-panjiri',
    name: 'Classic Panjiri',
    pricePerKg: 1200,
    tagline: 'The timeless grandmother heritage recipe',
    description: 'Slow roasted organic whole wheat flour in 100% pure A2 Bilona Desi Ghee, delicately fragrant with freshly ground green cardamom, crushed almonds, and wholesome traditional raw shakkar.',
    keyIngredients: ['100% Pure A2 Desi Ghee', 'Stone-ground Whole Wheat', 'Crushed California Almonds', 'Green Cardamom (Elaichi)', 'Traditional Desi Shakkar'],
    benefits: ['Daily morning energy sustenance', 'Digestive warmth in cold weather', 'Nourishing comfort for the whole family'],
    nutrition: {
      calories: 490,
      protein: '9.2g',
      healthyFats: '26g',
      carbs: '54g'
    },
    recommendedFor: 'Daily breakfast snack, student study fuel, all age groups',
    image: '/assets/aistudio/image_9615a613.png',
    isPopular: true
  },
  {
    id: 'gond-panjiri',
    name: 'Gond Panjiri',
    pricePerKg: 1300,
    tagline: 'Fortified with crispy edible acacia gum for bone & spine strength',
    description: 'Handcrafted with crunchy popped Gond (edible dink gum) fried in pure bilona ghee, blended with kamarkas and roasted nuts. Revered in Ayurveda for strengthening the spine, soothing joint stiffness, and maternal postpartum recovery.',
    keyIngredients: ['Pure Popped Gond (Edible Gum)', 'Pure Bilona Desi Ghee', 'Whole Almonds & Cashews', 'Kamarkas Herb', 'Makhana (Foxnuts)', 'Organic Khandsari'],
    benefits: ['Lubricates joints & supports spine health', 'Postpartum recovery and uterine toning', 'Deep warming vitality for winter'],
    nutrition: {
      calories: 520,
      protein: '11.5g',
      healthyFats: '31g',
      carbs: '48g'
    },
    recommendedFor: 'New mothers (post-pregnancy), elders with knee/back ache, winter cold protection',
    image: '/images/panjiri_cooking_1793380083114.jpg',
    isBestseller: true
  },
  {
    id: 'dry-fruits-panjiri',
    name: 'Dry Fruits Panjiri',
    pricePerKg: 1500,
    tagline: 'Overflowing with California almonds, jumbo cashews & pistachios',
    description: 'Over 60% dry fruit concentration! Golden roasted jumbo California almonds, buttery cashews, Afghan green pistachios, puffed lotus seeds (makhana), and crunchy melon seeds (charmagz) bound with rich desi ghee.',
    keyIngredients: ['California Almonds', 'Goa Jumbo Cashews', 'Afghan Green Pistachios', 'Crispy Makhana', 'Charmagz (Four Melon Seeds)', 'A2 Cow Ghee'],
    benefits: ['High natural Vitamin E for glowing skin', 'Heart-healthy mono-unsaturated fats', 'Potent brain booster & memory support'],
    nutrition: {
      calories: 545,
      protein: '14.8g',
      healthyFats: '36g',
      carbs: '41g'
    },
    recommendedFor: 'Dry fruit lovers, festive gifting, growing children & brain work',
    image: '/assets/aistudio/image_9615a613.png',
    isBestseller: true
  },
  {
    id: 'protein-panjiri',
    name: 'Protein Panjiri',
    pricePerKg: 1500,
    tagline: 'High-density natural plant protein for athletes & gym workouts',
    description: 'Crafted specifically for athletic performance and lean muscle recovery. Infused with roasted chana sattu, pumpkin seeds, chia seeds, crushed walnuts, and protein-packed makhana in pure bilona ghee.',
    keyIngredients: ['Roasted Chana Sattu', 'Crushed Walnuts (Akhrot)', 'Raw Pumpkin & Chia Seeds', 'Puffed Lotus Seeds', 'Pure Cow Ghee', 'Raw Unrefined Jaggery'],
    benefits: ['Clean plant protein without synthetic powders', 'Extended muscular satiety and stamina', 'Natural electrolytes & magnesium'],
    nutrition: {
      calories: 510,
      protein: '21.5g',
      healthyFats: '28g',
      carbs: '44g'
    },
    recommendedFor: 'Fitness enthusiasts, bodybuilders, active sports, clean weight gain',
    image: '/images/panjiri_ingredients_1793380059765.jpg'
  },
  {
    id: 'sugar-free-panjiri',
    name: 'Sugar Free Panjiri',
    pricePerKg: 1600,
    tagline: 'Zero refined sugar, zero glycemic spike, 100% authentic flavor',
    description: 'Guilt-free indulgence crafted for diabetics and keto-conscious eaters. Sweetened with natural botanical Stevia leaf extract and dried date fiber, slow-roasted in pure ghee with abundant roasted almonds, walnuts, and makhana.',
    keyIngredients: ['Natural Pure Stevia Leaf Extract', 'Crushed California Almonds', 'Puffed Makhana', 'A2 Cow Bilona Ghee', 'Golden Whole Wheat / Besan', 'Cardamom & Nutmeg'],
    benefits: ['Safe for blood sugar management', 'Low glycemic impact with high healthy fats', 'Zero artificial chemical sweeteners or maltodextrin'],
    nutrition: {
      calories: 460,
      protein: '12g',
      healthyFats: '32g',
      carbs: '22g'
    },
    recommendedFor: 'Diabetics, senior citizens, low-carb / keto lifestyles',
    image: '/assets/aistudio/image_9615a613.png'
  },
  {
    id: 'special-panjiri',
    name: 'Special Royal Panjiri',
    pricePerKg: 1700,
    tagline: 'The imperial royal blend infused with pure Kashmiri saffron & chilgoza',
    description: 'Our crowned masterpiece. Drenched generously in reserve-batch Gir cow A2 bilona ghee, loaded with rare wild pine nuts (chilgoza), golden Kashmiri saffron (kesar), roasted gond, almonds, cashews, makhana, and fragrant mace.',
    keyIngredients: ['Kashmiri Mongra Kesar (Saffron)', 'Wild Pine Nuts (Chilgoza)', 'Jumbo Cashews & Almonds', 'Crisp Gond & Kamarkas', 'Double Churned A2 Ghee', 'Desi Khand'],
    benefits: ['Imperial royal rejuvenation & stamina', 'Improves blood circulation & glowing complexion', 'Supreme winter protection and joint longevity'],
    nutrition: {
      calories: 560,
      protein: '15.2g',
      healthyFats: '38g',
      carbs: '39g'
    },
    recommendedFor: 'Royal winter indulgence, wedding gifting, supreme revitalization',
    image: '/assets/aistudio/image_9615a613.png',
    isPopular: true
  }
];

export const DESI_GHEE_PRODUCTS: DesiGheeProduct[] = [
  {
    id: 'desi-ghee-500ml',
    name: 'Shuddh A2 Gir Cow Bilona Ghee (500ml)',
    subtitle: 'Cultured curd churned using traditional wooden bilona',
    price: 950,
    volume: '500 ml Glass Jar',
    description: 'Pure, granular, golden nectar handcrafted from grass-fed Gir cows. Made using the ancient 5-step Vedic Bilona method: cultured curd is hand-churned before slow simmering on a low wood fire.',
    benefits: [
      'Rich in fat-soluble vitamins A, D, E, and K2',
      'High natural butyric acid supports gut microbiome and digestion',
      'High smoke point (250°C / 482°F) ideal for cooking and roasting',
      'Zero preservatives, zero palm oil, 100% natural aroma'
    ],
    image: '/images/desi_ghee_jar_1793380040196.jpg'
  },
  {
    id: 'desi-ghee-1000ml',
    name: 'Shuddh A2 Gir Cow Bilona Ghee (1000ml)',
    subtitle: 'Artisanal reserve batch in premium airtight glass jar',
    price: 1850,
    volume: '1000 ml Glass Jar',
    description: 'Our full 1 Litre artisanal glass jar. Naturally golden yellow due to natural beta-carotene from pasture-grazing indigenous cows. Unparalleled fragrant aroma and melt-in-mouth grainy texture.',
    benefits: [
      'Directly sourced from cruelty-free free-range Gaushalas',
      'Enhances memory, cognitive function, and cellular vitality (Ojas)',
      'Traditional Ayurvedic rasayana for longevity and glowing skin',
      'Hermetically sealed wooden lid preserves fresh fragrance'
    ],
    image: '/images/desi_ghee_jar_1793380040196.jpg'
  }
];

export const AYURVEDIC_BENEFITS = [
  {
    id: 'energy',
    title: 'Energy Booster',
    iconName: 'Zap',
    subtitle: 'Sustained stamina all day',
    description: 'Slow-release complex carbohydrates and healthy medium-chain fats from pure ghee provide steady vital energy without afternoon sugar crashes.'
  },
  {
    id: 'immunity',
    title: 'Immunity Support',
    iconName: 'ShieldCheck',
    subtitle: 'Natural winter defense',
    description: 'Packed with immune-enhancing dry fruits, zinc, antioxidants, and warming green cardamom that shield against seasonal flu, cough, and chill.'
  },
  {
    id: 'natural',
    title: '100% Natural',
    iconName: 'Leaf',
    subtitle: 'Zero preservatives & pure ghee',
    description: 'No chemical stabilizers, no artificial colors, zero trans fats, and absolutely zero palm oil or vanaspati. Pure purity guaranteed.'
  },
  {
    id: 'all-ages',
    title: 'Good For All Ages',
    iconName: 'Dumbbell',
    subtitle: 'Kids, mothers, athletes & elders',
    description: 'Supports brain development in growing kids, replenishes calcium & strength for new mothers, restores muscle glycogen for athletes, and eases joints in elders.'
  }
];

export const VIDEO_SCENES = [
  {
    id: 'scene-bowl',
    title: 'The Royal Brass Bowl',
    subtitle: 'Authentic Panjiri from the original menu poster',
    description: 'Ultra-crisp macro showcase of the golden brass engraved bowl loaded with roasted almonds, cashews, and glistening desi ghee.',
    duration: '0:08',
    image: '/assets/aistudio/image_9615a613.png',
    tag: 'Original Poster'
  },
  {
    id: 'scene-kadai',
    title: 'Slow Kadai Roasting',
    subtitle: 'Aromatic steam rising from live iron kadai',
    description: 'Handcrafted roasting in progress: bubbling golden desi ghee coating every morsel of whole wheat, almonds, and crunchy gond.',
    duration: '0:07',
    image: '/images/panjiri_cooking_1793380083114.jpg',
    tag: 'Live Artisan Craft'
  },
  {
    id: 'scene-ghee',
    title: 'Pure Bilona Ghee Cascade',
    subtitle: 'Liquid gold dripping from carved wooden spoon',
    description: 'Velvety golden A2 Gir cow ghee flowing smoothly into the artisanal glass preserve jar in warm morning light.',
    duration: '0:06',
    image: '/images/desi_ghee_jar_1793380040196.jpg',
    tag: 'Liquid Gold'
  },
  {
    id: 'scene-ingredients',
    title: 'Imperial Raw Ingredients',
    subtitle: 'California almonds, makhana, gond & pistachios',
    description: 'Rustic flatlay of hand-sorted royal dry fruits, crunchy edible gum, and emerald cardamom pods ready for roasting.',
    duration: '0:05',
    image: '/images/panjiri_ingredients_1793380059765.jpg',
    tag: 'Purity Unveiled'
  }
];
