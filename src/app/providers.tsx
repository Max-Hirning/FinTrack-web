'use client'

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { makeQueryClient } from 'shared/constants/queries';

interface IProps {
  children: ReactNode;
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: IProps) {
  const queryClient = makeQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        style={{
          maxWidth: '100%',
          width: 'max-content',
        }}
      />
    </QueryClientProvider>
  )
}