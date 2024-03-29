import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Loader} from "@/components/Loader";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {ReactElement, ReactNode} from "react";
import {ProviderComponent} from "@/components/Provider";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "FinTrack",
};
const inter = Inter({subsets: ["latin"]});

export default function Layout({children}: IProps): ReactElement {
  return (
    <html lang="en">
      <ProviderComponent>
        <body className={`${inter.className} h-screen w-screen`}>
          <Loader/>
          <ToastContainer
            rtl={false}
            theme="light"
            draggable={true}
            autoClose={5000}
            pauseOnFocusLoss
            pauseOnHover={true}
            closeOnClick={true}
            newestOnTop={false}
            position="top-right"
            className="text-[15px]"
            hideProgressBar={false}
          />
          {children}
        </body>
      </ProviderComponent>
    </html>
  );
}
