"use client"

import { ChevronDown } from "lucide-react"
import { Button, DropdownMenuCheckboxItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "shared/ui"

interface IProps {
  data: {
    label: string;
    value: string;
  }[];
  title: string;
  value: string[];
  onChange: (data: string[]) => void;
}

export function MultipleSelect({title, value, data, onChange}: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center justify-between px-[12px]"
        >
          {title}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuCheckboxItem
          onCheckedChange={(isChecked) => {
            if(!isChecked) {
              onChange([])
            } else {
              onChange(data.map((el) => el.value))
            }
          }}
          checked={data.length === value.length}
        >
          All
        </DropdownMenuCheckboxItem>
        {
          data.map((el, index) => {
            return (
              <DropdownMenuCheckboxItem
                key={index}
                onCheckedChange={(isChecked) => {
                  if(!isChecked) {
                    onChange(value.filter(a => a !== el.value))
                  } else {
                    onChange([...value, index.toString()])
                  }
                }}
                checked={value.includes(index.toString()) || data.length === value.length}
              >
                {el.label}
              </DropdownMenuCheckboxItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
