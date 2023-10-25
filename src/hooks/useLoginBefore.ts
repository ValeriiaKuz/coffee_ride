import { useEffect, useState } from "react";
import { useSelector } from "@/src/servicies/redux/hooks/hooks";
import { auth } from "@/src/firebase/firebase";

export function useIsAuth() {
  const [isLoginBefore, setLoginBefore] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const userBefore = useSelector((state) => state.user.uid);

  useEffect(() => {
    setUser(userBefore);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const isAuthProps = {
    userID: user,
    isAuth: !!user,
    isLoginBefore: isLoginBefore,
    setLoginBefore: setLoginBefore,
  };
  return isAuthProps;
}
