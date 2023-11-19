"use client";

import UserContext from "@/context/userContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useContext, useRef } from "react";

const Header = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const conditionRef = useRef<HTMLSelectElement | null>(null);
  const searchStringRef = useRef<HTMLInputElement | null>(null);

  if (!userContext) {
    return <></>;
  }
  const { userName, role, isLogin, signout } = userContext;
  /**
   * 로컬 스토리지에서 토큰 제거
   *
   * login 변수 false로 변경
   */
  const logout = () => {
    signout();
  };

  const goHome = () => {
    router.push("/");
    router.refresh();
  };

  const search = (event: FormEvent) => {
    event.preventDefault();
    if (!conditionRef.current || !searchStringRef.current) {
      return;
    }
    const condition = conditionRef.current.value;
    const searchString = searchStringRef.current.value;
    router.push(`/?${condition}=${searchString}`);
  };

  return (
    <header className="grid grid-flow-row gap-8 sm:grid-cols-1 lg:grid-cols-3 m-5 items-center justify-items-center">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
            clipRule="evenodd"
          />
        </svg>
        <button
          onClick={goHome}
          className="font-semibold text-xl text-[#252C32]"
        >
          전자제품리뷰사이트
        </button>
      </div>

      <form>
        <div className="inline-flex m-1">
          <select
            ref={conditionRef}
            className="border-4 border-blue-500 outline-none"
          >
            <option value={"deviceName"}>전자제품</option>
            <option value={"categoryName"}>카테고리</option>
          </select>
        </div>
        <div className="inline-flex m-1">
          <input
            ref={searchStringRef}
            type="text"
            placeholder="검색어"
            className="border-4 border-blue-500 pl-3 outline-none w-full min-w-fit max-w-sm"
          />
          <button onClick={search} className="border-4 border-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>

      {userName !== "" && !isLogin && (
        <div className="flex">
          <Link href={"/signin"}>
            <button>
              <div className="mx-2 rounded-md border-2 py-2 px-4 hover:bg-gray-100">
                <span className="text-sm font-medium">로그인</span>
              </div>
            </button>
          </Link>
          <Link href={"/signup"}>
            <button>
              <div className="mx-2 rounded-md border-2 py-2 px-4 hover:bg-gray-100">
                <span className="text-sm font-medium">회원가입</span>
              </div>
            </button>
          </Link>
        </div>
      )}

      {userName !== "" && isLogin && (
        <div className="flex">
          <div className="mx-4 flex items-center">{`${userName}님`}</div>
          <button onClick={logout}>
            <div className="mx-2 rounded-md border-2 py-2 px-4 hover:bg-gray-100">
              <span className="text-sm font-medium">로그아웃</span>
            </div>
          </button>
          {role === "ADMIN" && (
            <Link href={"/admin"}>
              <button>
                <div className="mx-2 rounded-md border-2 py-2 px-4 hover:bg-gray-100">
                  <span className="text-sm font-medium">관리자페이지</span>
                </div>
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
