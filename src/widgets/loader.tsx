'use client'

import { LoaderCircle } from 'lucide-react';
import { QueryKeys } from 'shared/constants';
import { useIsMutating } from '@tanstack/react-query'

export function Loader() {
  const isDeleteCard = useIsMutating({ mutationKey: [QueryKeys.deleteCard] })

  if(isDeleteCard) {
    return (
      <div 
        style={{backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}}
        className='w-full h-screen fixed top-0 flex items-center justify-center' 
      >
        <LoaderCircle className="animate-spin text-white" />
      </div>
    )
  }

  return null;
}