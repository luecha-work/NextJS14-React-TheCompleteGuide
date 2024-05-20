import MainHeader from "@/components/main-header/main-header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS Course App",
  description: "Your first NextJS app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
