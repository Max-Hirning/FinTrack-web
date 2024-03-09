"use client";

import React, {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function Provider({children}: IProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}