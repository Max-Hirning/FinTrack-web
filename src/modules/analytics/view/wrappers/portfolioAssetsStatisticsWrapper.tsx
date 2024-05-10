import React, {ReactElement} from "react";
import {getServerSession} from "next-auth";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "@/modules/profile";
import {authOptions} from "@/configs/authOptions";
import {analyticsAPI} from "../../controllers/api/crypto";
import {PortfolioAssetsStatistics} from "../portfolioAssetsStatistics";
import {IPortfolioAssetsStatisticsFilters} from "../../types/assetsStatistics";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function PortfolioAssetsStatisticsWrapper(): Promise<ReactElement> {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);

  const filters: Pick<IPortfolioAssetsStatisticsFilters, "ownerId"> = {
    ownerId: (session?.user as IUserSession).id,
  };

  await queryClient.prefetchQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QueryKeys.getPortfolioAssetsStatistics, JSON.stringify(filters)],
    queryFn: () => analyticsAPI.getAssets(filters, (session?.user as IUserSession).jwt),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioAssetsStatistics
        filters={filters}
        session={session?.user as IUserSession}
      />
    </HydrationBoundary>
  );
}