"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");

    if (authUser) {
      router.push("/dashboard");
    }
  }, [router]);
}
