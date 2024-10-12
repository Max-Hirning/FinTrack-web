'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export const useGetUrlQueries = () => {
  const searchParams = useSearchParams();

  const allQueryParams = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    const entries = Object.fromEntries(params.entries());
    return entries;
  }, [searchParams]);

  return allQueryParams;
};