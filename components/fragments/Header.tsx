"use client";

import UserContext from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Header = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  if (!userContext) {
    return <></>;
  }
  const { userName, role, isLogin, signout } = userContext;
  /**
   * 로컬 스토리지에서 토큰 제거
   *
   * login 변수 false로 변경
   *
   * 홈 디렉토리로 라우트
   */
  const logout = () => {
    signout();
    router.push("/");
  };

  const goHome = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <header className="m-4 text-center">
      <div className="inline-flex m-2">
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
        <button
          onClick={goHome}
          className="font-semibold text-xl text-[#252C32]"
        >
          전자제품리뷰사이트
        </button>
      </div>

      <div className="inline-flex m-2">
        <select className="border-4 border-blue-500 outline-none">
          <option>전자제품</option>
          <option>카테고리</option>
          <option>리뷰글 제목</option>
        </select>
        <input
          type="text"
          placeholder="검색어"
          className="border-4 border-blue-500 pl-3 outline-none w-40"
        />
        <button className="border-4 border-blue-500">
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

      {userName !== "" && !isLogin && (
        <div className="inline-flex">
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
        <div className="inline-flex align-middle">
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
