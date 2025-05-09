import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export type Image = {
  id: number;
  thumb: string;
  small: string;
  large: string;
};

export type VariationTypeOption = {
  id: number;
  name: string;
  images: Image[];
  type: VariationType;
};

export type VariationType = {
  id: number;
  name: string;
  type: "Select" | "Radio" | "Image";
  options: VariationTypeOption[];
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  images: Image[];
  description: string;
  short_description: string;
  user: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  variationTypes: VariationType[];
  variations: Array<{
    id: number;
    variation_type_option_ids: number[];
    quantity: number;
    price: number;
  }>;
};

export interface PaginatedProducts {
  data: Product[];
  links: any;
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ProductPaginationProps {
  links: PaginationLink[]; // Simplified from nested structure
  currentPage: number;
  lastPage: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface cartItems {
  id: number;
  product_id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  option_ids: Record<string, number>;
  options: VariationTypeOption[];
}

export type PaginationProps<T> = {
  data: Array<T>;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };

  totalQuantity: number;
  totalPrice: number;
  cartItems: cartItems[];
};
