'use client'

import { ReactNode } from 'react'
import { Loader } from 'widgets/index';
import { queryClient } from 'shared/constants';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface IProps {
  children: ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Loader/>
      <ToastContainer
        style={{
          maxWidth: '100%',
          width: 'max-content',
        }}
      />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}