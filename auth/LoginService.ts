/**
 * 헤더에 토큰을 담아서 url에 요청을 보냄
 * @param url
 * @param method
 * @param json
 * @returns fetch() 결과
 * @deprecated
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
 * @deprecated
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
 * 헤더에 토큰을 담아서 url에 요청을 보냄
 * @param url
 * @param method
 * @param files
 * @returns
 * @deprecated
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
