export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  sku: string;
  image: string;
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  features?: string[];
}