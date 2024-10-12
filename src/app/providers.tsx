'use client'

import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactNode } from 'react'
import { queryClient } from 'shared/constants';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface IProps {
  children: ReactNode;
}

export default function Providers({ children }: IProps) {
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