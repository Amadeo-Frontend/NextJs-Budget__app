// /hooks/useRequireAuth.jsx

"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/lib/store/auth-context";
import { toast } from "react-toastify";

export default function useRequireAuth() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.info("Você precisa estar logado para acessar esta página.");
      router.push("/signin");
    }
  }, [user, loading, router]);

  return { user, loading };
}
