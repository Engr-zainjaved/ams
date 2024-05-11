"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-4/5 ">
      <div className=" md:flex md:gap-x-2 hidden ">
        <Button asChild variant={pathName === "/your-flights" ? "default" : "outline"}>
          <Link href="/your-flights">Your Flights</Link>
        </Button>
        <Button asChild variant={pathName === "/flights" ? "default" : "outline"}>
          <Link href="/flights">Flights</Link>
        </Button>

        <Button asChild variant={pathName === "/settings" ? "default" : "outline"}>
          <Link href="/settings">Settings</Link>
        </Button>
        <Button asChild variant={pathName === "/admin/create-flight" ? "default" : "outline"}>
          <Link href="/admin/create-flight">Admin</Link>
        </Button>
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HamburgerMenuIcon width="20" height="20" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto flex flex-col  space-y-1" align="start">
            <Button asChild variant={pathName === "/your-flights" ? "default" : "ghost"}>
              <Link href="/your-flights">
                <DropdownMenuItem className="cursor-pointer">Your Flights</DropdownMenuItem>
              </Link>
            </Button>
            <Button asChild variant={pathName === "/flights" ? "default" : "ghost"}>
              <Link href="/flights">
                <DropdownMenuItem className="cursor-pointer">Flights</DropdownMenuItem>
              </Link>
            </Button>
            <Button asChild variant={pathName === "/settings" ? "default" : "ghost"}>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              </Link>
            </Button>
            <Button asChild variant={pathName === "/admin" ? "default" : "ghost"}>
              <Link href="/admin">
                <DropdownMenuItem className="cursor-pointer">Admin</DropdownMenuItem>
              </Link>
            </Button>
            <Button asChild variant={pathName === "/flights-beta" ? "default" : "ghost"}>
              <Link href="/flights-beta">
                <DropdownMenuItem className="cursor-pointer">Flights(Beta)</DropdownMenuItem>
              </Link>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
