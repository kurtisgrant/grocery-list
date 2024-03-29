"use client";

import type { Session } from "next-auth";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

type NavigationProps = {
  session: Session | null;
};

export default function Navigation({ session }: NavigationProps) {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="w-full">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex-grow"></NavigationMenuItem>
        {session && (
          <NavigationMenuItem>
            <Badge className="hover:bg-primary">
              Logged in as {session.user?.name}
            </Badge>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {session ? "Sign out" : "Sign in"}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
