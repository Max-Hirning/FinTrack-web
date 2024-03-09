import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React, {ReactNode} from "react";
import {Provider} from "@/components/Provider";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "FinTrack",
};
const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: IProps) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${inter.className} h-screen w-screen`}>{children}</body>
      </Provider>
    </html>
  );
}
