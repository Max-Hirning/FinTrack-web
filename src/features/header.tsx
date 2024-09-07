"use client"

import { usePathname } from 'next/navigation'
import { pages } from 'shared/constants/pages';
import { Avatar, AvatarFallback, AvatarImage, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "shared/ui";

export function Header() {
  const pathname = usePathname()
  const page = pages.find((el) => el.url === pathname);

  return (
    <header className="z-50 sticky top-0 right-0 bg-background w-[calc(100%-60px)] ml-auto flex border-border border-b h-[80px] items-center justify-between p-[20px]">
      <h1 className="text-2xl font-bold">{page?.title || "Overview"}</h1>
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
    </header>
  );
}
