import { Product, ProductFormData } from '../types';

export interface AdminProductManagementProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onSubmit: (formData: ProductFormData, editingProduct: Product | null) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
}