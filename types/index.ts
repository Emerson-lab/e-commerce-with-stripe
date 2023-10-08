export type ProductData = {
  id: string;
  name: string;
  description?: string;
  price: string | number;
  currency: string;
  image: string;
  images?: string[];
};

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type GetDummyProductsType = {
  id: string;
  description: string;
  name: string;
  images: string[];
  default_price_data: {
    unit_amount_decimal: string;
    currency: 'BRL';
  };
}