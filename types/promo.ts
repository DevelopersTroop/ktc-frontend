export interface IPromoBar {
  _id: string;
  page: string;
  title: string;
  url: string;
  isActive: boolean;
  isDelete: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
