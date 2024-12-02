"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { UserRole } from "@/types";

const roles = [
  {
    value: "SENDER",
    label: "I'm Sending",
  },
  {
    value: "TRAVELER",
    label: "I'm Traveling",
  },
] as const;

export function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("SENDER");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {roles.find((r) => r.value === role)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Switch role..." />
          <CommandEmpty>No role found.</CommandEmpty>
          <CommandGroup>
            {roles.map((r) => (
              <CommandItem
                key={r.value}
                value={r.value}
                onSelect={(currentValue) => {
                  setRole(currentValue.toUpperCase() as UserRole);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    role === r.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {r.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}