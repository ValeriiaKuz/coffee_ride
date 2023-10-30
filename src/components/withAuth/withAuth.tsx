"use client";
import React, { useEffect, useState } from "react";
import { signInWithCustomToken, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/src/firebase/firebase";
import { getCookie } from "cookies-next";

const withAuth = (Component: React.FC<{ user: User }>): React.FC => {
  const AuthenticatedComponent = (props: any) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          const token: string = getCookie("accessToken") as string;
          if (token) {
            signInWithCustomToken(auth, token).then((userCredential) => {
              const user = userCredential.user;
              setUser(user);
            });
          }
          router.push("/login");
        }
      });
      return unsubscribe;
    }, []);

    if (user) {
      return <Component {...props} user={user} />;
    }

    return null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
