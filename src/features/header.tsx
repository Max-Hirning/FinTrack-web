"use client"

import { pages } from 'shared/constants';
import { Bell, BellDot } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "shared/ui";

const notifications = {
  "2024-09-14": [
    {
      "id": "notif1",
      "title": "Goal Deadline",
      "message": "Your goal 'New Car' is due today.",
      "isRead": false,
      "goalId": "goal1",
      "userId": "user1"
    },
    {
      "id": "notif4",
      "title": "Budget Deadline",
      "message": "Your budget 'Monthly Groceries' is expiring today.",
      "isRead": false,
      "budgetId": "budget1",
      "userId": "user1"
    },
    {
      "id": "notif7",
      "title": "Loan Expired",
      "message": "Your loan 'Student Loan' has expired. Please review your repayment options.",
      "isRead": false,
      "loanId": "loan1",
      "userId": "user1"
    }
  ],
  "2024-09-13": [
    {
      "id": "notif2",
      "title": "Goal Near Border",
      "message": "Your goal 'Vacation Fund' is 5% away from the target amount.",
      "isRead": false,
      "goalId": "goal2",
      "userId": "user1"
    },
    {
      "id": "notif6",
      "title": "Budget Near Border",
      "message": "You are 5% away from reaching your 'Travel' budget limit.",
      "isRead": false,
      "budgetId": "budget3",
      "userId": "user1"
    },
    {
      "id": "notif8",
      "title": "Loan Near Border",
      "message": "You are 5% away from repaying your loan 'Car Loan'.",
      "isRead": false,
      "loanId": "loan2",
      "userId": "user1"
    }
  ],
  "2024-09-12": [
    {
      "id": "notif3",
      "title": "Happy Birthday!",
      "message": "Happy Birthday, John! 🎉",
      "isRead": false,
      "userId": "user1"
    },
    {
      "id": "notif5",
      "title": "Overwhelming Budget",
      "message": "You have exceeded your 'Entertainment' budget by 20%.",
      "isRead": false,
      "budgetId": "budget2",
      "userId": "user1"
    }
  ],
  "2024-09-11": [
    {
      "id": "notif3",
      "title": "Happy Birthday!",
      "message": "Happy Birthday, John! 🎉",
      "isRead": false,
      "userId": "user1"
    },
    {
      "id": "notif5",
      "title": "Overwhelming Budget",
      "message": "You have exceeded your 'Entertainment' budget by 20%.",
      "isRead": false,
      "budgetId": "budget2",
      "userId": "user1"
    }
  ]
}



export function Header() {
  const pathname = usePathname()
  const page = pages.find((el) => el.url === pathname);

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
            {/* className='overflow-auto' */}
            <SheetHeader className='mb-2'>
              <SheetTitle className='font-extrabold text-xl'>Notifications</SheetTitle>
            </SheetHeader>
            <div className='mb-6 overflow-auto h-[-webkit-fill-available]'>
              <TooltipProvider>
                {
                  Object.entries(notifications).map(([key, value]) => {
                    return (
                      <div className='mb-5' key={key}>
                        <h3 className='mb-2 text-lg font-bold'>{key}</h3>
                        <div className='flex flex-col gap-3'>
                          {
                            value.map((el) => {
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
                        </div>
                      </div>
                    )
                  })
                }
              </TooltipProvider>
            </div>
          </SheetContent>
        </Sheet>
        <Dialog>
          <Menubar className='border-none bg-transparent'>
            <MenubarMenu>
              <MenubarTrigger className='bg-transparent p-0 rounded-full'>
                <Avatar className='w-[60px] h-[60px]'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Logout</MenubarItem>
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
                <Button variant="destructive">Delete</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
