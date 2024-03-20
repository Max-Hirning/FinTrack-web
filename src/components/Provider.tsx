"use client";

import {store} from "@/store";
import {Provider} from "react-redux";
import {IResponse} from "@/types/api";
import React, {ReactNode, useState} from "react";
import {IStatuses, ToastifyCaller} from "@/UI/AlertUI";
import {SessionProvider, signOut} from "next-auth/react";
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface IProps {
  children: ReactNode;
}

export function ProviderComponent({children}: IProps) {
  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if((error as IResponse<undefined>)?.statusCode === 401) {
          ToastifyCaller(IStatuses.error, "Unauthorized");
          signOut();
        }
      }
    }),
    mutationCache: new MutationCache({
      onError: (error: unknown) => {
        if((error as IResponse<undefined>)?.statusCode === 401) {
          ToastifyCaller(IStatuses.error, "Unauthorized");
          signOut();
        }
      },
    })
  }));

  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}