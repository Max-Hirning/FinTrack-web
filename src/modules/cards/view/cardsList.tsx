"use client";

import Link from "next/link";
import AddIcon from "@/UI/icons/add";
import {useDispatch} from "react-redux";
import {setCard} from "@/modules/store";
import React, {ReactElement} from "react";
import {AppDispatch} from "@/types/store";
import {useRouter} from "next/navigation";
import {useGetCards} from "../hooks/getCards";
import {IUserSession} from "@/modules/profile";
import {BankCard} from "@/components/BankCard";
import {ICardResponse, ICardsFilters} from "../types/card";
import {BankCardSkeleton} from "@/components/skeletons/BankCard";

interface IProps {
  session: IUserSession;
  filters: Pick<ICardsFilters, "ownerId">;
}

export function CardsList({filters, session}: IProps): ReactElement {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {data, isError, isLoading} = useGetCards(filters, session.jwt);

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
        href="/cards#title"
        aria-label="Card form"
        className="bg-white border items-center hover:bg-slate-100 active:bg-slate-200 justify-center border-[#DFEAF2] rounded-[25px] min-w-[350px] h-[235px] p-[20px] flex flex-col relative"
      >
        <AddIcon width={50} height={50} color="#343C6A"/>
        <p className="text-text text-[20px] font-bold mt-[10px]">Add card</p>
      </Link>
    );
  }

  return (
    <>
      {
        (data?.data?.cards || []).map(({currency, balance, owner, color, title, _id}: ICardResponse) => {
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
                  dispatch(setCard({_id, title, color, currency, balance}));
                  router.push("/cards#title");
                }
              }}
              ownerLastName={owner.lastName}
              ownerFirstName={owner.firstName}
            />
          );
        })
      }
      <Link 
        href="/cards#title"
        aria-label="Card form"
        className="bg-white border items-center justify-center hover:bg-slate-100 active:bg-slate-200 border-[#DFEAF2] rounded-[25px] w-full min-w-[350px] h-[235px] p-[20px] flex flex-col relative"
      >
        <AddIcon width={50} height={50} color="#343C6A"/>
        <p className="text-text text-[20px] font-bold mt-[10px]">Add card</p>
      </Link>
    </>
  );
}