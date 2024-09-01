"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { pages } from "shared/constants/pages";
import { Tooltip, TooltipContent, TooltipTrigger } from "shared/ui";
import { CreditCard, LayoutDashboard, UserRoundPen, WalletMinimal, BadgeCent, Settings } from "lucide-react"

export function SideBar() {
  const pathname = usePathname()
  const index = pages.findIndex((el) => (el.url === pathname) && (pathname !== "/settings"));

  return (
    <>
      <div
        style={{transform: `translateY(${index * 48}px)`}}
        className={`${(index === -1) && "hidden"} bg-accent duration-500 ease-out delay-0 absolute top-[100.25px] left-[13.25px] z-10 flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-all hover:text-foreground md:h-8 md:w-8`}
      />
      <nav className="mt-[80px] flex flex-col items-center gap-4 px-2 py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/transactions"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <BadgeCent className="h-5 w-5" />
              <span className="sr-only">Transactions</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Transactions</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/accounts"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <WalletMinimal className="h-5 w-5" />
              <span className="sr-only">Accounts</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Accounts</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/cards"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <CreditCard className="h-5 w-5" />
              <span className="sr-only">Cards</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Cards</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/profile"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <UserRoundPen className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Profile</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
}
