"use client";

import { format } from "date-fns";
import { ArrowDownToLine, ArrowUpToLine, LoaderCircle } from "lucide-react"
import { useState } from "react";
import { useGetTransactions } from "shared/hooks";
import { Card, Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "shared/ui"

interface IProps {
  userId: string;
}

export function TransactionsTable({userId}: IProps) {
  const [page, setPage] = useState(1);
  const {data: transactions, isLoading} = useGetTransactions({
    page,
    loanIds: [],
    goalIds: [],
    cardIds: [],
    budgetIds: [],
    currencies: [],
    userIds: [userId],
    transactionIds: [],
  });

  return (
    <>
      <Card className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base p-[16px]">Description</TableHead>
              <TableHead className="text-base p-[16px]">Type</TableHead>
              <TableHead className="text-base p-[16px]">Card</TableHead>
              <TableHead className="text-base p-[16px]">Date</TableHead>
              <TableHead className="text-base p-[16px]">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={`${((transactions?.data || []).length === 0 || isLoading) && "h-[190px]"}`}>
            {
              (isLoading) ? <TableRow><TableCell colSpan={5}><LoaderCircle className="animate-spin m-auto" /></TableCell></TableRow> :
              (transactions?.data || []).length === 0 ? <TableRow><TableCell colSpan={5}><p className="text-destructive font-bold text-lg text-center">No Data</p></TableCell></TableRow> :
              (transactions?.data || []).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="max-w-[350px] w-[350px]">
                    <p className="text-base flex items-center gap-[5px]">{(transaction.amount > 0) ? <ArrowDownToLine size={24} /> : <ArrowUpToLine size={24} />}{transaction.description}</p>
                  </TableCell>
                  <TableCell className="max-w-[250px] w-[250px]">
                    <p className="text-base">{transaction.category.title}</p>
                  </TableCell>
                  <TableCell className="max-w-[110px] w-[110px]">
                    <p className="text-base">**** {transaction.card.id.slice(-4)}</p>
                  </TableCell>
                  <TableCell className="max-w-[165px] w-[165px]">
                    <p className="text-base">{format(new Date(transaction.date), "d MMM, h.mm a")}</p>
                  </TableCell>
                  <TableCell className="max-w-[200px] w-[200px]">
                    <p className={`text-base ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>{transaction.card.currency} {transaction.amount}</p>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
      {
        (transactions && transactions.totalPages !== 1) &&
        <Pagination className="max-sm:float-none mt-[20px] w-fit float-end">
          <PaginationContent>
            <PaginationItem onClick={() => setPage((state) => state-4)}>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem className={`${page === 1 && "hidden"}`}>
              <PaginationLink>{page-1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={true}>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem className={`${!transactions.nextPage && "hidden"}`} onClick={() => setPage(transactions.nextPage+1)}>
              <PaginationLink>{transactions.nextPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem className={`${!transactions.nextPage && "hidden"}`} onClick={() => setPage(transactions.nextPage+2)}>
              <PaginationLink>{transactions.nextPage+1}</PaginationLink>
            </PaginationItem>
            <PaginationItem onClick={() => setPage((state) => state+4)}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      }
    </>
  )
}
