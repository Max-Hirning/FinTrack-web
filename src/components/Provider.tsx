"use client";

import {store} from "@/store";
import {Provider} from "react-redux";
import React, {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function ProviderComponent({children}: IProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}