import { Fragment } from "react";
import MainHeader from "./main-header";

type LayoutProps = React.PropsWithChildren<Record<string, unknown>>;

function Layout(props: LayoutProps) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
