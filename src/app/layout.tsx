import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { cn } from "shared/lib/utils";
import { TooltipProvider } from "shared/ui";
import { Inter as FontSans } from "next/font/google"

interface IProps {
  children: ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "FinTrack",
};

export default function RootLayout({ children }: Readonly<IProps>) {
  return (
    <TooltipProvider>
      <html lang="en">
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
      </html>
    </TooltipProvider>
  );
}
