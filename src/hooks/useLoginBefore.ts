import { useState } from "react";
import { useSelector } from "@/src/servicies/redux/hooks/hooks";

export function useIsAuth() {
  const [isLoginBefore, setLoginBefore] = useState(false);
  const user = useSelector((state) => state.user.uid);
  const isAuthProps = {
    isAuth: !!user,
    isLoginBefore: isLoginBefore,
    setLoginBefore: setLoginBefore,
  };
  return isAuthProps;
}
