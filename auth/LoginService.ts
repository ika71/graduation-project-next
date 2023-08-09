import { backendUrl } from "@/url/backendUrl";

interface LoginSuccess {
  token: string;
}
/**
 * 로그인 성공 시 로컬 스토리지 토큰 저장
 * @param email
 * @param password
 * @returns 로그인 성공 true, 로그인 실패 false
 */
export const signin = async (email: string, password: string) => {
  const member = {
    email: email,
    password: password,
  };
  const res = await authReqeust(`${backendUrl}/member/signin`, "POST", member);
  if (res.ok) {
    const loginData: LoginSuccess = await res.json();
    if (loginData.token) {
      localStorage.setItem("token", loginData.token);
      return true;
    }
  }

  return false;
};
/**
 * 헤더에 토큰을 담아서 url에 요청을 보냄
 * @param url
 * @param method
 * @param json
 * @returns fetch() 결과
 */
export const authReqeust = (url: string, method: string, json: object) => {
  let headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
  });

  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let http = {
    headers: headers,
    method: method,
    body: JSON.stringify(json),
  };
  return fetch(url, http);
};
/**
 * 헤더에 토큰을 담아서 url에 요청을 보냄
 * @param url
 * @param method
 * @param json
 * @returns fetch() 결과
 */
export const authReqeustWithOutBody = (url: string, method: string) => {
  let headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
  });

  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let http = {
    headers: headers,
    method: method,
  };
  return fetch(url, http);
};
/**
 * 로컬스토리지에서 토큰 제거
 */
export const signout = () => {
  localStorage.removeItem("token");
};
/**
 * 헤더에 토큰을 담아서 url에 요청을 보냄
 * @param url
 * @param method
 * @param files
 * @returns
 */
export const authReqeustFile = (
  url: string,
  method: string,
  files: FormData
) => {
  let headers = new Headers({});

  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }
  let http = {
    headers: headers,
    method: method,
    body: files,
  };
  return fetch(url, http);
};

/**
 * @deprecated userContext 상태 변수로 대체
 * @returns 로그인 토큰 존재 시 true 토큰 없으면 false
 */
export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
