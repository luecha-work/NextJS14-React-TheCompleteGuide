import React from "react";

interface NewsDetailLayoutProps {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

function NewsDetailLayout({ children, modal }: NewsDetailLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}

export default NewsDetailLayout;
