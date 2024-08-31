"use client"

import { usePathname } from 'next/navigation'
import { pages } from 'shared/constants/pages';
import { Avatar, AvatarFallback, AvatarImage } from "shared/ui";

export function Header() {
  const pathname = usePathname()
  const page = pages.find((el) => el.url === pathname);

  return (
    <header className="z-50 sticky top-0 right-0 bg-background w-[calc(100%-60px)] ml-auto flex border-border border-b h-[80px] items-center justify-between p-[20px]">
      <h1 className="text-2xl font-bold">{page?.title || "Overview"}</h1>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
