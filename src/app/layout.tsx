import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React, {ReactNode} from "react";
import {Loader} from "@/components/Loader";
import {ProviderComponent} from "@/components/Provider";

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
      <ProviderComponent>
        <body className={`${inter.className} h-screen w-screen`}>
          <Loader/>
          {children}
        </body>
      </ProviderComponent>
    </html>
  );
}
