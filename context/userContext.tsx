"use client";

import { backendUrl } from "@/url/backendUrl";
import { createContext, useEffect, useState } from "react";

interface Context {
  userName: string;
  role: string;
  isLogin: boolean;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
  authRequest: (url: string, method: string, body?: any) => Promise<Response>;
}

interface FetchData {
  userName: string;
  role: string;
}

interface LoginSuccess {
  refreshToken: string;
  accessToken: string;
}

interface RefreshTokenSuccess {
  accessToken: string;
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
  let accessToken = "null";

  /**
   * 인증 정보를 이용해 회원의 정보를 가져온 후
   * userContext state에 저장함
   * @see userContext
   */
  const fetchMember = async () => {
    const res = await authRequest(`${backendUrl}/member`, "GET");

    if (!res.ok) {
      return;
    }
    const memberInfo: FetchData = await res.json();

    setUserContext({
      userName: memberInfo.userName,
      role: memberInfo.role,
      isLogin: true,
    });
  };

  /**
   * 로그인을 처리함
   * 리프레쉬 토큰은 로컬스토리지에 액세스 토큰은 accessToken 변수에 저장됨
   * @param email
   * @param password
   * @returns
   * @see accessToken
   */
  const signin = async (email: string, password: string) => {
    const member = {
      email: email,
      password: password,
    };
    const http = {
      headers: new Headers({
        "Content-Type": "application/json; charset=utf-8",
      }),
      method: "POST",
      body: JSON.stringify(member),
    };
    const res = await fetch(`${backendUrl}/member/signin`, http);
    if (res.ok) {
      const loginData: LoginSuccess = await res.json();
      localStorage.setItem("token", loginData.refreshToken);
      accessToken = loginData.accessToken;

      await fetchMember();
      return true;
    }
    return false;
  };

  /**
   * 로그아웃을 처리함
   *
   * 로컬 스토리지의 리프레쉬 토큰을 제거하고
   *
   * userContext state를 기본 값으로 초기화
   *
   * 변수에 존재하는 accessToken을 "null"로 변경
   */
  const signout = () => {
    localStorage.removeItem("token");
    setUserContext({
      userName: "anonymous",
      role: "anonymous",
      isLogin: false,
    });
    accessToken = "null";
  };

  function authRequest(url: string, method: string): Promise<Response>;
  function authRequest(
    url: string,
    method: string,
    files: FormData
  ): Promise<Response>;
  function authRequest(
    url: string,
    method: string,
    json: object
  ): Promise<Response>;

  /**
   * 이 함수는 인증이 필요한 요청에 사용된다.
   *
   * 요청 시에 토큰을 헤더에 포함하며, 해당 토큰의 유효기간이 종료되었을 시
   *
   * 리프레쉬 토큰을 이용해 액세스 토큰을 받아와서 다시 요청을 보낸다.
   *
   * 만약 리프레쉬 토큰도 유효하지 않을 시에는 사용자를 로그아웃 시킨다.
   * @param url 요청을 보낼 url이다.
   * @param method 대문자 문자열로 method를 표시한다.
   * @param body body는 생략할 수 있으며 생략하지 않을 시 object 또는 FormData를 쓸 수 있다. object로 사용 시 json 요청이 이루어진다.
   */
  async function authRequest(url: string, method: string, body?: any) {
    let headers = new Headers({});
    if (localStorage.getItem("token") && accessToken === "null") {
      await tokenRefresh();
    }
    headers.append("Authorization", "Bearer " + accessToken);

    let http;
    //body에 타입에 따라 http 설정을 바꾼다.
    if (!body) {
      http = {
        headers: headers,
        method: method,
      };
    } else if (body instanceof FormData) {
      http = {
        headers: headers,
        method: method,
        body: body,
      };
    } else {
      headers.append("Content-Type", "application/json; charset=utf-8");
      http = {
        headers: headers,
        method: method,
        body: JSON.stringify(body),
      };
    }

    const res = await fetch(url, http);
    //토큰이 만료되었으면 refresh 토큰으로 액세스 토큰을 발급 후 다시 요청한다.
    //만약 토큰 갱신에 실패하면 그냥 return한다.
    if (!res.ok && (await res.text()) === "ExpiredJwt") {
      if (await tokenRefresh()) {
        return;
      }
      authRequest(url, method, body);
    }
    return res;
  }
  /**
   * 리프레쉬 토큰을 이용해 액세스 토큰을 발급한다.
   */
  const tokenRefresh = async () => {
    const headers = new Headers({});

    const refreshToken = localStorage.getItem("token");
    if (refreshToken) {
      headers.append("Authorization", "Bearer " + refreshToken);
    }
    let http = {
      headers: headers,
      method: "POST",
    };
    const res = await fetch(`${backendUrl}/member/refresh`, http);
    //refresh 토큰이 만료되었으면 로그아웃한다.
    if (!res.ok && (await res.text()) === "ExpiredJwt") {
      signout();
      return false;
    }
    if (!res.ok) {
      return false;
    }
    const refreshTokenSucess: RefreshTokenSuccess = await res.json();
    accessToken = refreshTokenSucess.accessToken;
    return true;
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
    authRequest: authRequest,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
