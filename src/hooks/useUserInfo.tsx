"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserData = {
  title: string;
  frist: string;
  last: string;
  email: string;
  username: string;
  id: string | undefined;
  picture: string;
};

export function useUserInfo() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (!storedUser) {
      router.push("/auth");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as UserData;
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("authUser");
      router.push("/auth");
    }
  }, [router]);

  return user;
}
