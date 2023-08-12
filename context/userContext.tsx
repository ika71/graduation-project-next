"use client";

import { authReqeust, authReqeustWithOutBody } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface Context {
  userName: string;
  role: string;
  isLogin: boolean;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
}

interface FetchData {
  userName: string;
  role: string;
}

interface LoginSuccess {
  token: string;
}

const UserContext = createContext<Context | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userContext, setUserContext] = useState({
    userName: "anonymous",
    role: "anonymous",
    isLogin: false,
  });
  const router = useRouter();

  const fetchMember = async () => {
    const res = await authReqeustWithOutBody(`${backendUrl}/member`, "GET");
    /**
     * @todo 토큰으로 정보를 가져오는 api 실패가 단순 실패인지
     * 토큰이 유효하지 않은건지 구분하는 로직을 추가해야함
     */
    if (!res.ok) {
      signout();
      alert("로그인이 만료되었습니다.");
      router.push("/signin");
      return;
    }
    const memberInfo: FetchData = await res.json();

    setUserContext({
      userName: memberInfo.userName,
      role: memberInfo.role,
      isLogin: true,
    });
  };

  const signin = async (email: string, password: string) => {
    const member = {
      email: email,
      password: password,
    };
    const res = await authReqeust(
      `${backendUrl}/member/signin`,
      "POST",
      member
    );
    if (res.ok) {
      const loginData: LoginSuccess = await res.json();
      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
        await fetchMember();
        return true;
      }
    }
    return false;
  };

  const signout = () => {
    localStorage.removeItem("token");
    setUserContext({
      userName: "anonymous",
      role: "anonymous",
      isLogin: false,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context: Context = {
    userName: userContext.userName,
    role: userContext.role,
    isLogin: userContext.isLogin,
    signin: signin,
    signout: signout,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
