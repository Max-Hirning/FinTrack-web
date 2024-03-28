"use client";

import Image from "next/image";
import {LoaderUI} from "@/UI/LoaderUI";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {AppDispatch} from "@/types/store";
import {setTransction} from "@/modules/store";
import {IUserSession} from "@/modules/profile";
import {hexToRgba} from "@/controllers/colors";
import {Pagination} from "@/components/Pagination";
import React, {ReactElement, useState} from "react";
import {useGetTransactions} from "../hooks/getTransactions";
import {amountColor, amountSymbol} from "../controllers/styles";
import {convertISODateToCustomFormat} from "@/controllers/dates";
import {ITransactionResponse, ITransactionsFilters} from "../types/transaction";

interface IProps {
  session: IUserSession;
  filters: Omit<ITransactionsFilters, "date">;
}

export function TransactionsTable({filters, session}: IProps): ReactElement {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const {data, isLoading, isError} = useGetTransactions({...filters, page}, session.jwt);

  return (
    <>
      <section className="card pb-[20px] relative max-w-fit px-[20px] h-[397px] overflow-auto">
        <table className="w-full h-full min-w-[1000px]">
          <thead className="sticky top-0 left-0 bg-[white]">
            <tr>
              <th className="w-[350px] text-start pt-[20px] pb-[10px]">Description</th>
              <th className="w-[250px] text-start pt-[20px] pb-[10px]">Category</th>
              <th className="w-[130px] text-start pt-[20px] pb-[10px]">Date</th>
              <th className="w-[150px] text-start pt-[20px] pb-[10px]">Amount</th>
              <th className="w-[100px] text-start pt-[20px] pb-[10px]">Card</th>
            </tr>
          </thead>
          {
            (isLoading) ?
              <LoaderUI styles="absolute left-[calc(50%-88px)] mt-[75px]"/> :
              (isError || !data?.data || data?.data.data.data.length === 0) ?
                <p className="text-danger absolute left-[calc(50%-92.58px)] mt-[75px] text-[24px] font-bold">No Data</p> :
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
                          <td className="py-[10px] w-[350px] h-full flex items-center">
                            <div
                              style={{backgroundColor: hexToRgba(category.color, 0.5)}}
                              className="flex rounded-[20px] h-[55px] min-w-[55px] min-h-[55px] w-[55px] justify-center items-center"
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
                          <td className="py-[10px] w-[250px] text-text title text-[16px] font-normal">{category.title}</td>
                          <td className="py-[10px] w-[130px] text-text title text-[16px] font-normal">{convertISODateToCustomFormat(date)}</td>
                          <td className={`${amountColor(amount)} w-[150px] py-[10px] title text-[16px] font-medium`}>{amountSymbol(amount)}{Math.abs(amount)} {card.currency}</td>
                          <td className="py-[10px] text-text title w-[100px] text-[16px] font-normal">{card.title}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
          }
        </table>
      </section>
      {
        (data?.data?.page && data?.data?.totalPages) &&
        <Pagination
          page={data.data.page}
          count={data.data.totalPages}
          disabled={isLoading || isError}
          onChange={(value: number) => setPage(value)}
        />
      }
    </>
  );
}