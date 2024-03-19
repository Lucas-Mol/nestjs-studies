class ProductAttribute {
  name: string;
  description: string;
}

class ProductImage {
  url: string;
  description: string;
}

export class Product {
  id: string;
  userId: string;
  name: string;
  price: number;
  amount: number;
  description: string;
  category: string;
  attributes: ProductAttribute[];
  images: ProductImage[];
}
