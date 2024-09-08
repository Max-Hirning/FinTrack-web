import { ArrowDownToLine, ArrowUpToLine } from "lucide-react"
import { CardsListWidget, ExpensesStatisticsWidget } from "widgets/index"
import { Card, Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Transaction } from "shared/ui"

export default function Page() {
  return (
    <>
      <section className="flex max-md:flex-col w-full gap-[25px]">
        <CardsListWidget styles="max-md:w-full md:w-[calc(100%-350px-25px)]"/>
        <ExpensesStatisticsWidget/>
      </section>
      <section className="mt-[25px] sm:max-w-fit w-full">
        <article className="flex items-end justify-between mb-[5px]">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
        </article>
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
            <TableBody>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[350px] w-[350px]">
                  <p className="text-base flex items-center gap-[5px]"><ArrowUpToLine size={24} /> Spotify Subscription</p>
                </TableCell>
                <TableCell className="max-w-[250px] w-[250px]">
                  <p className="text-base">Shopping</p>
                </TableCell>
                <TableCell className="max-w-[110px] w-[110px]">
                  <p className="text-base">1234 ****</p>
                </TableCell>
                <TableCell className="max-w-[165px] w-[165px]">
                  <p className="text-base">28 Jan, 12.30 AM</p>
                </TableCell>
                <TableCell className="max-w-[200px] w-[200px]">
                  <p className="text-red-500 text-base">-$2,500</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        <Pagination className="max-sm:float-none mt-[20px] w-fit float-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={true}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </>
  )
}
