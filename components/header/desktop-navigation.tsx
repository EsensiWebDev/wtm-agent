"use client";

import Link from "next/link";

interface MenuItem {
  name: string;
  href: string;
  isPublic: boolean;
}

interface DesktopNavigationProps {
  filteredMenuItems: MenuItem[];
}

export function DesktopNavigation({
  filteredMenuItems,
}: DesktopNavigationProps) {
  return (
    <div className="hidden lg:block">
      <ul className="flex gap-8 text-sm">
        {filteredMenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                href={item.href}
                className="block font-semibold duration-150"
              >
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
