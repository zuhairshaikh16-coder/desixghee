export interface PanjiriVariety {
  id: string;
  name: string;
  pricePerKg: number;
  tagline: string;
  description: string;
  keyIngredients: string[];
  benefits: string[];
  nutrition: {
    calories: number; // per 100g
    protein: string;
    healthyFats: string;
    carbs: string;
  };
  recommendedFor: string;
  image: string;
  isPopular?: boolean;
  isBestseller?: boolean;
}

export interface DesiGheeProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  volume: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  type: 'panjiri' | 'ghee';
  weightOrVolume: string; // e.g. "500g", "1 kg", "2 kg", "500ml", "1 Litre"
  sweetener?: string; // e.g. "Desi Shakkar", "Sugar Free", etc.
  packaging?: string; // e.g. "Traditional Royal Brass Tin", "Airtight Pouch"
  price: number;
  quantity: number;
  image: string;
}

export interface CustomPanjiriConfig {
  base: 'whole_wheat' | 'semolina_suji' | 'multigrain_besan';
  gheeRichness: 'balanced' | 'traditional' | 'royal_rich';
  nutsLevel: 'standard' | 'double_nuts' | 'imperial_overload';
  addGond: boolean;
  addMakhana: boolean;
  addKamarkas: boolean;
  addKesarSaffron: boolean;
  sweetener: 'desi_shakkar' | 'khandsari_sugar' | 'organic_jaggery' | 'stevia_sugar_free';
  weightKg: number;
}
