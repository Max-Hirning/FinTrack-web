"use client"

import * as React from "react"
import { format, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "shared/lib"
import {
  Button, 
  Popover,
  Calendar,
  PopoverContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  PopoverTrigger,
  TimePicker,
} from "shared/ui"

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const years = Array.from({ length: 125 }, (_, i) => 2024 - i); // From 2024 to 1900

interface IProps {
  value: Date;
  timePicker?: boolean;
  onChange: (date: Date) => void;
}

export function DatePicker({value: date, timePicker, onChange: setDate}: IProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? timePicker ? format(date, "PPP p") : format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex flex-col items-center gap-[10px]">
          {timePicker && <TimePicker date={date} setDate={(date) => {
            date && setDate(date)
          }}/>}
          <div className="flex items-center w-full gap-[10px]">
            <Select onValueChange={(value) => setDate(setMonth(date || new Date(), +value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent position="popper">
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setDate(setYear(date || new Date(), +value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent position="popper">
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-md border">
          <Calendar
            month={date}
            mode="single"
            selected={date}
            onMonthChange={newDate => {
              if (date) {
                setDate(
                  setMonth(
                    setYear(date, newDate.getFullYear()),
                    newDate.getMonth(),
                  ),
                );
              }
            }}
            key={date ? date.toString() : 'no-selected'}
            onDayClick={selectedDate => selectedDate && setDate(selectedDate)}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
