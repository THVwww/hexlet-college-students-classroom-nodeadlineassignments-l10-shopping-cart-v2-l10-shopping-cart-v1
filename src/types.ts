export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  inStock: number;
  image?: string;
}

export interface CartItem extends Product {
  count: number;
}
