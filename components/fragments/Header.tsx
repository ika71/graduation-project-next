"use client";

import { isLogin, signout } from "@/auth/LoginService";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  /*
   * login=true면 로그인 상황
   * login=false면 로그아웃 상황
   */
  const [login, setLogin] = useState(false);

  /*
   * 최초 페이지 로딩 시 setLogin호출
   * 경로 변경 시 setLogin호출
   */
  useEffect(() => {
    setLogin(isLogin());
  }, [pathname]);

  /**
   * @ 로컬 스토리지에서 토큰 제거
   * @ login 변수 false로 변경
   * @ 홈 디렉토리로 라우트
   */
  const logout = () => {
    signout();
    setLogin(isLogin());
    router.push("/");
  };

  return (
    <div>
      <div className="bg-white">
        <div className="border py-3 px-6">
          <div className="flex justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
              <Link href={"/"} className="ml-2 font-semibold text-[#252C32]">
                전자제품 정보
              </Link>
            </div>

            <div className="ml-6 flex flex-1 gap-x-3">
              <div className="flex cursor-pointer select-none items-center gap-x-2 rounded-md border bg-[#4094F7] py-2 px-4 text-white hover:bg-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="text-sm font-medium">Categories</span>
              </div>

              <input
                type="text"
                className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
                defaultValue="입력창"
              />
            </div>

            <div className="ml-2 flex">
              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                <span className="text-sm font-medium">기기 검색</span>
              </div>

              {!login && (
                <Link href={"/signin"}>
                  <button>
                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                      <span className="text-sm font-medium">로그인</span>
                    </div>
                  </button>
                </Link>
              )}

              {!login && (
                <Link href={"/signup"}>
                  <button>
                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                      <span className="text-sm font-medium">회원가입</span>
                    </div>
                  </button>
                </Link>
              )}

              {login && (
                <button onClick={logout}>
                  <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                    <span className="text-sm font-medium">로그아웃</span>
                  </div>
                </button>
              )}

              {login && (
                <Link href={"/admin"}>
                  <button>
                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                      <span className="text-sm font-medium">관리자 페이지</span>
                    </div>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
