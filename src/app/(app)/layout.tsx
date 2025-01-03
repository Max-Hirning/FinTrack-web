import { ReactNode } from "react";
import type { Metadata } from "next";
import { Header, SideBar } from "features/index";
import { getUserCookies } from "src/shared/lib/api/server";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "FinTrack",
};

export default async function RootLayout({ children }: Readonly<IProps>) {
  const user = await getUserCookies();

  return (
    <>
      <aside className="w-[60px] fixed inset-y-0 left-0 z-10 flex-col border-r bg-background flex transition-transform transform translate-x-0">
        <SideBar/>
      </aside>
      <Header userId={user.id}/>
      <main className="w-[calc(100%-60px)] ml-auto flex flex-col p-[20px]">
        {children}
      </main>
    </>
  );
}
