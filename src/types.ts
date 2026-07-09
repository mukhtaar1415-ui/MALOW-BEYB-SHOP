export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number; // For rendering crossed-out original prices if needed
  colorName: string;
  colorHex: string;
  image: string;
  hoverImage?: string;
  description: string;
  sizes: string[];
  category: string;
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviewsCount?: number;
  thumbnails?: string[];
  gender?: 'boys' | 'girls' | 'unisex';
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export type ScreenType = 'home' | 'shop' | 'detail' | 'cart' | 'wishlist' | 'track';

export interface Category {
  id: string;
  name: string;
  image: string;
  bgColor: string;
}

export function getProductGender(product: Product): 'boys' | 'girls' | 'unisex' {
  if (product.gender) return product.gender;
  
  const lowerName = product.name.toLowerCase();
  const lowerColor = product.colorName.toLowerCase();
  
  if (
    lowerColor.includes('lavender') || 
    lowerName.includes('botanical') || 
    lowerName.includes('pointelle') || 
    lowerName.includes('bloom') || 
    lowerName.includes('skirt') || 
    lowerName.includes('dress') ||
    lowerName.includes('mittens') ||
    lowerName.includes('swaddle')
  ) {
    return 'girls';
  }
  
  if (
    lowerColor.includes('blue') || 
    lowerColor.includes('mint') || 
    lowerColor.includes('sage') || 
    lowerColor.includes('caramel') ||
    lowerName.includes('suspenders') || 
    lowerName.includes('pants') || 
    lowerName.includes('shorts') || 
    lowerName.includes('jacket') ||
    lowerName.includes('beanie')
  ) {
    return 'boys';
  }
  
  return 'unisex';
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  sizePurchased?: string;
}

export interface SimulatedEmail {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  timestamp: string;
  bodyHtml: string;
  bodyText: string;
  type: 'welcome' | 'order_confirmation';
}

