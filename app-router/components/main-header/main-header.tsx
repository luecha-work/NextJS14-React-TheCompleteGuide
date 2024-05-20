"use client";

import Link from "next/link";

import Image from "next/image";

import MainHeaderBackground from "./main-header-background";

import classes from "@/styles/main-header.module.css";
import NavLink from "./nav-link";

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src="/images/logo.png" alt="Logo" width={200} height={200} />
          NextLevel Foot
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Communiny</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
