"use client"

import Link from "next/link";
import { pages } from "shared/constants";
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from "shared/ui";
import { CreditCard, LayoutDashboard, UserRoundPen, WalletMinimal, BadgeCent, Settings, Wallet, Landmark } from "lucide-react"

export function SideBar() {
  const pathname = usePathname()
  const index = pages.findIndex((el) => (el.url === pathname) && (pathname !== "/settings"));

  return (
    <>
      <div
        style={{transform: `translateY(${index * 52}px)`}}
        className={`${(index === -1) && "hidden"} bg-accent duration-500 ease-out delay-0 absolute top-[100px] left-[12px] z-10 flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-all hover:text-foreground`}
      />
      <nav className="mt-[80px] flex flex-col items-center gap-[16px] px-2 py-[20px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
              href="/cards"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
              href="/budgets"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Wallet className="h-5 w-5" />
              <span className="sr-only">Budgets</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Budgets</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/goals"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <BadgeCent className="h-5 w-5" />
              <span className="sr-only">Goals</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Goals</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/loans"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Landmark className="h-5 w-5" />
              <span className="sr-only">Loans</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Loans</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/profile"
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
              className="z-20 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
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
