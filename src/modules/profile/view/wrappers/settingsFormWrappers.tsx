import React from "react";
import {getServerSession} from "next-auth";
import {SettingsForm} from "../settingsForm";
import {QueryKeys} from "@/configs/queryKeys";
import {IUserSession} from "../../types/user";
import {authOptions} from "@/configs/authOptions";
import {currencyAPI} from "@/controllers/api/currency";
import {HydrationBoundary, QueryClient, dehydrate} from "@tanstack/react-query";

export async function SettingsFormWrappers() {
  const queryClient = new QueryClient();
  const data = await getServerSession(authOptions);

  await queryClient.prefetchQuery({
    queryFn: () => currencyAPI.getAll(),
    queryKey: [QueryKeys.getCurrencies],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsForm user={data?.user as IUserSession}/>
    </HydrationBoundary>
  );
}
