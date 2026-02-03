
export interface RawProduct {
  id: string;
  item_group_id: string;
  title: string;
  brand: string;
  category: string;
  image_link: string;
  additional_image_link: string;
  sale_price: string;
  price: string;
  discount_percentage: string;
  rating: string;
  sold: string;
  description: string;
  color: string;
  size: string;
  availability: string;
}

export interface ProductGroup {
  id: string;
  title: string;
  brand: string;
  category: string;
  image: string;
  minPrice: number;
  maxDiscount: number;
  rating: number;
  sold: number;
  description: string;
  variants: RawProduct[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  variant: {
    color: string;
    size: string;
  };
  quantity: number;
}

// Fixed: Added missing Product interface used in constants.tsx and ProductCard.tsx
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export type ViewState = 'main' | 'profile';
