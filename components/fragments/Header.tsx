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
   * @ 로컬 스토리지에서 토큰 제거
   * @ login 변수 false로 변경
   * @ 홈 디렉토리로 라우트
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
              <button
                onClick={goHome}
                className="ml-2 font-semibold text-[#252C32]"
              >
                전자제품 리뷰사이트
              </button>
            </div>

            <div className="ml-6 flex flex-1 gap-x-3">
              <div className="relative inline-flex">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option>전자제품</option>
                  <option>카테고리</option>
                  <option>리뷰글 제목</option>
                </select>
              </div>

              <input
                type="text"
                className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
                defaultValue="입력창"
              />
            </div>

            <div className="ml-2 flex">
              <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                <span className="text-sm font-medium">검색</span>
              </div>

              {userName !== "" && !isLogin && (
                <Link href={"/signin"}>
                  <button>
                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                      <span className="text-sm font-medium">로그인</span>
                    </div>
                  </button>
                </Link>
              )}

              {userName !== "" && !isLogin && (
                <Link href={"/signup"}>
                  <button>
                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                      <span className="text-sm font-medium">회원가입</span>
                    </div>
                  </button>
                </Link>
              )}

              {userName !== "" && isLogin && (
                <div>
                  <span className="mx-1">{`${userName}님`}</span>
                  <button onClick={logout}>
                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                      <span className="text-sm font-medium">로그아웃</span>
                    </div>
                  </button>
                </div>
              )}

              {role === "ADMIN" && (
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
