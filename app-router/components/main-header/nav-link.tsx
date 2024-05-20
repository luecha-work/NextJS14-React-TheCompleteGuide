"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "@/styles/nav-link.module.css";

interface NavLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
