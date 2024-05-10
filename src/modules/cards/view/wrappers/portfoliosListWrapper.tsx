import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {PortfoliosList} from "../portfoliosList";
import {authOptions} from "@/configs/authOptions";
import {IPortfoliosFilters} from "../../types/portfolio";
import {portfolioAPI} from "../../controllers/api/portfolio";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function PortfoliosListWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const portfoliosFilters: Pick<IPortfoliosFilters, "ownerId"> = {
    ownerId: (session?.user as IUserSession).id
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getPortfolios, JSON.stringify(portfoliosFilters)],
    queryFn: () => portfolioAPI.getAll(portfoliosFilters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfoliosList 
        filters={portfoliosFilters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}