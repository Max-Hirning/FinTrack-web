"use client";

import React, {ReactElement} from "react";
import IncomeIcon from "@/UI/icons/income";
import OutcomeIcon from "@/UI/icons/outcome";
import BalanceIcon from "@/UI/icons/balance";
import {IUserSession} from "@/modules/profile";
import {AccountInfoCard} from "@/components/AccountInfoCard";
import {IAccountStatisticsFilters} from "../types/accountStatistics";
import {useGetAccountStatistics} from "../hooks/getAccountStatistics";
import {AccountInfoCardSkeleton} from "@/components/skeletons/AccountInfoCard";

interface IProps {
  session: IUserSession;
  filters: IAccountStatisticsFilters;
}

export function AccountStatistics({filters, session}: IProps): ReactElement {
  const {data, isLoading, isError} = useGetAccountStatistics(filters, session.jwt);

  if(isLoading) {
    return (
      <>
        <AccountInfoCardSkeleton/>
        <AccountInfoCardSkeleton/>
        <AccountInfoCardSkeleton/>
      </>
    );
  }

  if(isError) return <></>;

  return (
    <>
      <AccountInfoCard
        title="My Balance"
        iconColor="#FFBB38"
        currency={session.currency}
        ammount={(data?.data?.balance || 0).toFixed(2)}
      >
        <BalanceIcon width={30} height={30} color="#FFBB38"/>
      </AccountInfoCard>
      <AccountInfoCard
        title="Income"
        iconColor="#396AFF"
        currency={session.currency}
        ammount={(data?.data?.incomes || 0).toFixed(2)}
      >
        <IncomeIcon width={30} height={30} color="#396AFF"/>
      </AccountInfoCard>
      <AccountInfoCard
        title="Expense"
        iconColor="#FF82AC"
        currency={session.currency}
        ammount={(data?.data?.expenses || 0).toFixed(2)}
      >
        <OutcomeIcon width={30} height={30} color="#FF82AC"/>
      </AccountInfoCard>
    </>
  );
}