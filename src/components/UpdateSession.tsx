"use client";

import {useSession} from "next-auth/react";
import React, {ReactElement, ReactNode, useEffect} from "react";

interface IProps {
  children: ReactNode;
}

export function UpdateSession({children}: IProps): ReactElement {
  const {update} = useSession();

  useEffect(() => {
    const lastUpdateDate = localStorage.getItem("update-date");
    if(lastUpdateDate) {
      if(new Date(lastUpdateDate).toISOString().split("T")[0] !== new Date().toISOString().split("T")[0]) {
        update();
        localStorage.setItem("update-date", new Date().toISOString());
      }
    } else {
      update();
      localStorage.setItem("update-date", new Date().toISOString());
    }
  }, []);

  return (
    <>{children}</>
  );
}