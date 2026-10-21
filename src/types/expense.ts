export type ExpenseCategory =
  | "Consultation"
  | "Medicines"
  | "Supplements"
  | "Lab Tests"
  | "Nutrition"
  | "Delivery"
  | "Baby Essentials"
  | "Travel"
  | "Insurance"
  | "Others";

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Credit Card"
  | "Debit Card"
  | "Insurance"
  | "Other";

export type Trimester = "First" | "Second" | "Third";

export interface IBill {
  url?: string;
  fileName?: string;
}

export interface IExpense {
  _id?: string;
  userId?: string;
  expenseName: string;
  description?: string;
  category: ExpenseCategory;
  amount: number;
  paymentMethod?: PaymentMethod;
  trimester?: Trimester;
  notes?: string;
  bills?: IBill[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  avatar?: string;
  createdAt?: string;
}

export interface IChartFacetData {
  categoryResult: { _id: ExpenseCategory; totalAmount: number }[];
  trimesterResult: { _id: Trimester; totalAmount: number }[];
  paymentResult: { _id: PaymentMethod; totalAmount: number }[];
}
