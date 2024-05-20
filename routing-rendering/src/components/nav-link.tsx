"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinklProps {
  readonly href: string;
  readonly children: React.ReactNode;
}

function NavLink({ href, children }: NavLinklProps) {
  const path = usePathname();
  return (
    <Link href={href} className={path.startsWith(href) ? "active" : undefined}>
      {children}
    </Link>
  );
}

export default NavLink;
