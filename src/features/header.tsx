"use client"

import { pages } from 'shared/constants';
import { BellDot, LoaderCircle } from 'lucide-react';
import { useDeleteUser, useGetUser } from 'shared/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useGetNotifications } from 'src/shared/hooks/notification';
import { Avatar, InfiniteScroll, AvatarFallback, AvatarImage, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "shared/ui";

interface IProps {
  userId: string
}

export function Header({userId}: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {data: user} = useGetUser(userId);
  const {mutate: deleteUser} = useDeleteUser()
  const page = pages.find((el) => el.url === pathname);
  const {data: notifications, isFetchingNextPage, fetchNextPage, hasNextPage} = useGetNotifications();

  return (
    <header className="z-50 sticky top-0 right-0 bg-background w-[calc(100%-60px)] ml-auto flex border-border border-b h-[80px] items-center justify-between p-[20px]">
      <h1 className="text-2xl font-bold">{page?.title || "Overview"}</h1>
      <div className='flex flex-row gap-[25px]'>
        <Sheet>
          <SheetTrigger>
            {/* <Bell /> */}
            <BellDot />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className='mb-2'>
              <SheetTitle className='font-extrabold text-xl'>Notifications</SheetTitle>
            </SheetHeader>
            <div className='mb-6 overflow-auto pr-[5px] h-[-webkit-fill-available]'>
              <TooltipProvider>
                {
                  (notifications?.pages.map((el) => el.data).flat(1) || []).map((el) => {
                    return (
                      <Tooltip key={el.id}>
                        <TooltipTrigger>
                          <div className='border-b pb-2 text-start'>
                            <h4 className='font-semibold'>{el.title}</h4>
                            <p>{el.message}</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className='max-w-[335.2px]'>
                          <p className='whitespace-pre-wrap'>{el.message}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })
                }
              </TooltipProvider>
              <InfiniteScroll
                next={fetchNextPage}
                hasMore={hasNextPage}
                isLoading={isFetchingNextPage}
              >
                {hasNextPage && (
                  <LoaderCircle
                    size={32}
                    className="m-auto animate-spin-infinite my-6"
                  />
                )}
              </InfiniteScroll>
            </div>
          </SheetContent>
        </Sheet>
        <Dialog>
          <Menubar className='border-none bg-transparent'>
            <MenubarMenu>
              <MenubarTrigger className='bg-transparent p-0 rounded-full'>
                <Avatar className='w-[60px] h-[60px]'>
                  <AvatarImage src={user?.images[0]?.url || ""} />
                  <AvatarFallback>{user?.firstName[0] || ""}{user?.lastName[0] || ""}</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => router.push("/auth/sign-in")}>Logout</MenubarItem>
                <MenubarItem>
                  <DialogTrigger>Delete account</DialogTrigger>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <DialogContent>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
            <div className='gap-[20px] flex items-center'>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={() => deleteUser(userId)} variant="destructive">Delete</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
