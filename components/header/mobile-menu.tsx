"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  name: string;
  href: string;
  isPublic: boolean;
}

interface MobileMenuProps {
  menuState: boolean;
  setMenuState: (state: boolean) => void;
  filteredMenuItems: MenuItem[];
}

export function MobileMenu({
  menuState,
  setMenuState,
  filteredMenuItems,
}: MobileMenuProps) {
  return (
    <>
      <button
        onClick={() => setMenuState(!menuState)}
        aria-label={menuState ? "Close Menu" : "Open Menu"}
        className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
      >
        <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
        <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
      </button>

      {/* Menu Mobile */}
      <div className="bg-background mb-6 hidden w-full rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block lg:hidden dark:shadow-none">
        <div className="flex flex-col items-center space-y-6">
          <ul className="space-y-6 text-base">
            {filteredMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground block duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
