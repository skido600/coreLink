import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/ultil";

export function useUserUid() {
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
