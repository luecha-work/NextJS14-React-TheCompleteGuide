import { Fragment, PropsWithChildren } from "react";
import MainHeader from "./main-header";

function Layout(props: PropsWithChildren<object>) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
