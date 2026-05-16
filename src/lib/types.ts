export interface Product {
  id: string;
  sku: string;
  nameFr: string;
  descriptionFr: string | null;
  brand: string;
  price: string;
  originalPrice: string | null;
  currency: string;
  imageUrl: string | null;
  imageUrls: string[];
  stock: number;
  inStock: boolean;
  badge: string | null;
  rating: string;
  reviewCount: number;
  categoryId: string;
  category?: Category;
  dpp?: DPP | null;
}

export interface Category {
  id: string;
  slug: string;
  nameFr: string;
  description: string | null;
  imageUrl: string | null;
  _count?: { products: number };
}

export interface DPP {
  ingredients: string[];
  country: string;
  carbonFootprint: string | null;
  recyclable: boolean;
  certifications: string[];
  batchNumber: string | null;
  expiryDate: string | null;
  rawMaterialSources: Record<string, string> | null;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
