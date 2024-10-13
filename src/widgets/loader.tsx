'use client'

import { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react';
import { QueryKeys } from 'shared/constants';
import { useIsMutating } from '@tanstack/react-query'

interface IProps {
  children: ReactNode;
}

export function Loader({ children }: IProps) {
  const isDeleteCard = useIsMutating({ mutationKey: [QueryKeys.deleteCard] })

  return (
    <>
      {
        (isDeleteCard) &&
        <div 
          style={{backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}}
          className='w-full h-screen absolute flex items-center justify-center' 
        >
          <LoaderCircle className="animate-spin text-white" />
        </div>
      }
      {children}
    </>
  )
}