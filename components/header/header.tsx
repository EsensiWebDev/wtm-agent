"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Logo } from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CartButton } from "./cart-button";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileMenu } from "./mobile-menu";
import { NavUser } from "./nav-user";
import { NotificationButton } from "./notification-button";

const menuItems = [
  {
    name: "Home",
    href: "/home",
    isPublic: true,
  },
  {
    name: "History Booking",
    href: "/history-booking",
    isPublic: false,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    isPublic: false,
  },
];

export const Header = () => {
  const router = useRouter();
  const [menuState, setMenuState] = React.useState(false);

  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = !!session?.user;

  const handleSignIn = () => {
    router.push("/login");
  };

  // Filter menu items based on authentication status
  const filteredMenuItems = menuItems.filter(
    (item) => item.isPublic || isAuthenticated,
  );

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="bg-primary fixed z-20 w-full border-b text-white backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Left side - Navigation Menu */}
            <DesktopNavigation filteredMenuItems={filteredMenuItems} />

            {/* Center - Logo */}
            <div className="flex w-full items-center justify-center lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>
            </div>

            {/* Right side - Mobile menu button and user controls */}
            <div className="flex w-full items-center justify-end gap-6 lg:w-auto">
              <MobileMenu
                menuState={menuState}
                setMenuState={setMenuState}
                filteredMenuItems={filteredMenuItems}
              />

              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <CartButton isAuthenticated={isAuthenticated} />
                    <NotificationButton isAuthenticated={isAuthenticated} />
                  </>
                ) : (
                  <></>
                )}

                {/* Conditionally render sign-in button or user menu */}
                {isLoading ? (
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
                ) : session?.user ? (
                  <NavUser
                    user={{
                      name:
                        `${session.user.first_name || ""} ${session.user.last_name || ""}`.trim() ||
                        session.user.username ||
                        "User",
                      email: session.user.email || "",
                      avatar: session.user.photo_url || "/avatars/shadcn.jpg",
                    }}
                  />
                ) : (
                  <Button onClick={handleSignIn} variant={"ghost"}>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={""} alt={"Not logged In"} />
                      <AvatarFallback className="rounded-lg"></AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Sign in</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
