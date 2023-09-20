"use client";

import UserContext from "@/context/userContext";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useRef } from "react";

const SigninForm = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  if (!userContext) {
    return <></>;
  }

  /**
   * 로그인 성공 시 홈 디렉토리로 라우트
   * 실패 시 alert 창을 띄움
   * @returns
   */
  const login = async (event: FormEvent) => {
    event.preventDefault();
    if (emailInput.current === null || passwordInput.current === null) {
      return;
    }
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const res = await userContext.signin(email, password);

    if (res.ok) {
      router.push("/");
    } else if (res.status === 403) {
      alert("아이디 또는 비밀번호가 맞지 않습니다.");
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("로그인에 실패하였습니다");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">로그인</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              ref={emailInput}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              ref={passwordInput}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              onClick={login}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">로그인</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
