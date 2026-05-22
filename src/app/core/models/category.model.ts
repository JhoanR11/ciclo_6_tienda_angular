export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: Category;
  children?: Category[];
}