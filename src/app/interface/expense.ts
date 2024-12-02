enum ExpenseCategory {
  Groceries = 'Groceries',
  Utilities = 'Utilities',
  Entertainment = 'Entertainment',
  Travel = 'Travel',
  MembershipAndSubscription = 'Membership & Subscription',
  Toiletries = 'Toiletries',
}

export interface Expense {
  id: string;
  owner: string;
  amount: number;
  description?: string;
  category: ExpenseCategory;
}
