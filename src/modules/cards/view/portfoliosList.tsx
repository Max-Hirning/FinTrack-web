"use client";

import Link from "next/link";
import AddIcon from "@/UI/icons/add";
import {useDispatch} from "react-redux";
import React, {ReactElement} from "react";
import {useRouter} from "next/navigation";
import {AppDispatch} from "@/types/store";
import {ICardResponse} from "../types/card";
import {setPortfolio} from "@/modules/store";
import {IUserSession} from "@/modules/profile";
import {BankCard} from "@/components/BankCard";
import {IPortfoliosFilters} from "../types/portfolio";
import {useGetPortfolios} from "../hooks/getPortfolios";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";

interface IProps {
  session: IUserSession;
  filters: Pick<IPortfoliosFilters, "ownerId">;
}

export function PortfoliosList({filters, session}: IProps): ReactElement {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {data, isError, isLoading} = useGetPortfolios(filters, session.jwt);

  if(isLoading) {
    return (
      <>
        <BankCardSkeleton/>
        <BankCardSkeleton/>
        <BankCardSkeleton/>
      </>
    );
  }

  if(isError) {
    return (
      <Link 
        aria-label="Card form"
        href="/investments/cryptos#title"
        className="bg-white border items-center justify-center hover:bg-slate-100 active:bg-slate-200 border-[#DFEAF2] rounded-[25px] min-w-[350px] h-[235px] p-[20px] flex flex-col relative"
      >
        <AddIcon width={50} height={50} color="#343C6A"/>
        <p className="text-text text-[20px] font-bold mt-[10px]">Add portfolio</p>
      </Link>
    );
  }

  return (
    <>
      {
        (data?.data?.portfolios || []).map(({currency, color, balance, owner, title, _id}: ICardResponse) => {
          return (
            <BankCard 
              _id={_id}
              key={_id}
              title={title}
              color={color}
              balance={balance}
              currency={currency}
              onClick={(): void => {
                if(session.id === owner._id) {
                  dispatch(setPortfolio({_id, title, color}));
                  router.push("/investments/cryptos#title");
                }
              }}
              ownerLastName={owner.lastName}
              ownerFirstName={owner.firstName}
            />
          );
        })
      }
      <Link 
        aria-label="Card form"
        href="/investments/cryptos#title"
        className="bg-white border items-center justify-center hover:bg-slate-100 active:bg-slate-200 border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] flex flex-col relative"
      >
        <AddIcon width={50} height={50} color="#343C6A"/>
        <p className="text-text text-[20px] font-bold mt-[10px]">Add portfolio</p>
      </Link>
    </>
  );
}