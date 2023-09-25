export interface ProductFilters {
  title?: string;
  inStock?: boolean;
  orderBy?: 'stock' | 'price';
  sortOrder?: 'ASC' | 'DESC';
}
