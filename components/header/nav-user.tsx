"use client";

import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Spinner } from "../ui/spinner";

export const NavUser = ({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const [isPending, startTransition] = React.useTransition();

  const handleLogout = async (
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
        });
        const data = await response.json().catch(() => null);
        if (response.ok) {
          toast.success(
            (data && typeof data === "object" && "message" in data
              ? (data as { message?: string }).message
              : undefined) ?? "Logout successfully",
          );
        } else {
          const message =
            data && typeof data === "object" && "message" in data
              ? (data as { message?: string }).message
              : undefined;
          toast.error(message ?? "Failed to logout from server");
        }
      } catch (error) {
        console.error("Logout error", error);
        toast.error("Something went wrong while logging out");
      } finally {
        await signOut({ callbackUrl: "/login" });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"lg"}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-30 rounded-lg">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/settings"}>
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
          {isPending ? <Spinner /> : <LogOut className="size-4" />}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
