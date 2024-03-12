"use client";

import React from "react";
import {IUserSession} from "@/modules/profile";
import {IAccountFilters} from "../types/account";
import TransactionsIcon from "@/UI/icons/transaction";
import {useGetAccountInfo} from "../hooks/getAccountInfo";
import {AccountInfoCard} from "@/components/AccountInfoCard";

interface IProps {
  session: IUserSession;
  filters: IAccountFilters;
}

export function Accounts({filters, session}: IProps) {
  const {data} = useGetAccountInfo(filters, session.jwt);

  return (
    <>
      <AccountInfoCard
        title="My Balance"
        iconColor="#FFBB38"
        currency={session.currency}
        ammount={(data?.data?.balance || 0).toFixed(2)}
      >
        <TransactionsIcon width={30} height={30} color="#FFBB38"/>
      </AccountInfoCard>
      <AccountInfoCard
        title="Income"
        iconColor="#396AFF"
        currency={session.currency}
        ammount={(data?.data?.incomes || 0).toFixed(2)}
      >
        <TransactionsIcon width={30} height={30} color="#396AFF"/>
      </AccountInfoCard>
      <AccountInfoCard
        title="Expense"
        iconColor="#FF82AC"
        currency={session.currency}
        ammount={(data?.data?.expenses || 0).toFixed(2)}
      >
        <TransactionsIcon width={30} height={30} color="#FF82AC"/>
      </AccountInfoCard>
    </>
  );
}