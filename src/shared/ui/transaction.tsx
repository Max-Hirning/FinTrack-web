import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "shared/ui";

export function Transaction() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex gap-[10px] items-center justify-between">
          <div className="bg-[#FFF5D9] w-[55px] h-[55px] rounded-full"></div>
          <article>
            <p className="text-base">Deposit from my Card</p>
            <p className="text-sm text-gray-400">28 January 2021</p>
          </article>
          {/* text-green-500 */}
          <p className="text-base text-red-500">-$850</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
