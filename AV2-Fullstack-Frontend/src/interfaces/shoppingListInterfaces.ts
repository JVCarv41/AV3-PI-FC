export interface ProductType {
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

export interface ShoppingListType {
  _id: string;
  date: string;
  products: ProductType[];
}