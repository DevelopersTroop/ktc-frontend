export type TProductSummary = {
  id: string;
  name: string;
};

export type TUserSummary = {
  id: string;
  firstName: string;
  lastName: string;
};

export type TReviewStatus = "pending" | "approved" | "rejected";

/**
 * Updated TReview interface
 * Added optional photos and videos string arrays
 */
export interface TReview {
  id: string;
  productId: TProductSummary;
  userId?: TUserSummary;
  name?: string;
  email?: string;
  rating: number;
  comment: string;
  status: TReviewStatus;
  photos?: string[]; // <-- ADDED
  videos?: string[]; // <-- ADDED
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}
