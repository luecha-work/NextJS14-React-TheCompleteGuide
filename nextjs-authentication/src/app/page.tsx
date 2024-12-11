"use client";

import AuthForm from "@/components/auth-form";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const formMode = searchParams.get("mode") || "login";

  return <AuthForm mode={formMode} />;
}
