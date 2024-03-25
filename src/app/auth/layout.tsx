import React, {ReactNode} from "react";

interface IProps {
  children: ReactNode;
}

export default function Layout({children}: IProps) {
  return (
    <main className="flex flex-col items-center gap-[30px] py-[50px] w-full p-[25px]">{children}</main>
  );
}
