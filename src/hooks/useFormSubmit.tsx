"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type UseFetchMutationOptions = {
  onSuccess?: (data: ApiResponse) => void;
  onError?: (error: Error) => void;
};

type UserData = {
  email: string;
  username: string;
  id: string | null;
  picture: string;
  title: string;
  frist: string;
  last: string;
};

type ApiResponse = {
  results: Array<{
    name: { title: string; first: string; last: string };
    email: string;
    login: { username: string; uuid: string };
    picture: { large: string };
  }>;
};

export function useFetchMutation(
  url: string,
  options?: UseFetchMutationOptions
) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  async function mutate() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`خطایی در زمان ورود رخ داد: خطا با کد ${res.status}`);
      const data = (await res.json()) as ApiResponse;

      const user = data.results[0];
      const userData: UserData = {
        email: user.email,
        username: user.login.username,
        id: user.login.uuid || null,
        picture: user.picture.large,
        title: user.name.title,
        frist: user.name.first,
        last: user.name.last,
      };

      localStorage.setItem("authUser", JSON.stringify(userData));
      if (options?.onSuccess) options.onSuccess(data);
      setIsLoading(false);

      router.push("/dashboard");
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      setIsLoading(false);
      if (options?.onError) options.onError(errorObj);
    }
  }

  return { mutate, isLoading, error };
}
