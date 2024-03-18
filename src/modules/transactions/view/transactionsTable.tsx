"use client";

import React from "react";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {AppDispatch} from "@/types/store";
import {setTransction} from "@/modules/store";
import {IUserSession} from "@/modules/profile";
import {hexToRgba} from "@/controllers/colors";
import {useGetTransactions} from "../hooks/getTransactions";
import {amountColor, amountSymbol} from "../controllers/styles";
import {convertISODateToCustomFormat} from "@/controllers/dates";
import {ITransactionResponse, ITransactionsFilters} from "../types/transaction";

interface IProps {
  session: IUserSession;
  filters: Omit<ITransactionsFilters, "date">;
}

export function TransactionsTable({filters, session}: IProps) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {data} = useGetTransactions(filters, session.jwt);

  return (
    <table className="w-full h-full min-w-[1000px]">
      <thead className="sticky top-0 left-0 bg-[white]">
        <tr>
          <th className="text-start pt-[20px] pb-[10px]">Description</th>
          <th className="text-start pt-[20px] pb-[10px]">Category</th>
          <th className="text-start pt-[20px] pb-[10px]">Date</th>
          <th className="text-start pt-[20px] pb-[10px]">Amount</th>
          <th className="text-start pt-[20px] pb-[10px]">Card</th>
        </tr>
      </thead>
      <tbody>
        {
          (data?.data?.data.data || []).map(({_id, category, card, description, date, amount}: ITransactionResponse, index: number) => {
            return (
              <tr 
                key={_id}
                onClick={() => {
                  dispatch(setTransction({
                    _id,
                    amount,
                    description,
                    cardId: card._id,
                    categoryId: category._id,
                    date: new Date(date).toISOString().split("T")[0],
                  }));
                  router.push("/transactions#date");
                }}
                className={`cursor-pointer hover:bg-slate-200 active:bg-slate-300 ${((data?.data?.data.data || []).length-1 !== index) && "border-b border-[#E6EFF5]"}`}
              >
                <td className="py-[10px] h-full flex items-center">
                  <div
                    style={{backgroundColor: hexToRgba(category.color, 0.5)}}
                    className="flex rounded-[20px] h-[55px] w-[55px] justify-center items-center"
                  >
                    <Image
                      width={35}
                      height={35}
                      alt={category.title}
                      src={category.image}
                    />
                  </div>
                  <p className="text-text ml-[10px] title text-[16px] font-normal">{description}</p>
                </td>
                <td className="py-[10px] text-text title text-[16px] font-normal">{category.title}</td>
                <td className="py-[10px] text-text title text-[16px] font-normal">{convertISODateToCustomFormat(date)}</td>
                <td className={`${amountColor(amount)} py-[10px] title text-[16px] font-medium`}>{amountSymbol(amount)}{Math.abs(amount)} {card.currency}</td>
                <td className="py-[10px] text-text title text-[16px] font-normal">{card.title}</td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}