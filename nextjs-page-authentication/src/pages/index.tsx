import StartingPageContent from "@/components/starting-page/starting-page";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    console.log(
      "HomePage rendered > process.env.SECRET:",
      process.env.NEXT_PUBLIC_SECRET
    );
  }, []);
  return <StartingPageContent />;
}
