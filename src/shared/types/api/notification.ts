interface INotificationResponse {
  id: string;
  title: string;
  userId: string;
  loanId: string;
  goalId: string;
  isRead: boolean;
  message: string;
  budgetId: string;
}

export type {
  INotificationResponse
}