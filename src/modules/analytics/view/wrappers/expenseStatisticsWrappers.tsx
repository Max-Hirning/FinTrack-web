import React from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {IExpensesFilters} from "../../types/expensesStatistics";
import {ExpenseStatistics} from "../expenseStatistics";
import {getCurrentMonthRange} from "@/controllers/dates";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function ExpenseStatisticsWrappers() {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: IExpensesFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, date: getCurrentMonthRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getExpenses, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getExpenses(filters, (session?.user as IUserSession).jwt)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExpenseStatistics
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}