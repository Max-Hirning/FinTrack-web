import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api";
import {ExpenseStatistics} from "../expenseStatistics";
import {getCurrentMonthRange} from "@/controllers/dates";
import {IExpensesFilters} from "../../types/expensesStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function ExpenseStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const expensesFilters: IExpensesFilters = {
    currency: (session?.user as IUserSession).currency,
    filters: {cards: (session?.user as IUserSession).cards, onlyExpenses: true, date: getCurrentMonthRange()}
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getExpenses, JSON.stringify(expensesFilters)],
    queryFn: () => analyticsAPI.getExpensesCategories(expensesFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExpenseStatistics
        filters={expensesFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}