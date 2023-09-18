"use client";

import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

const SignupForm = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");

  /**
   * 회원 가입 성공 시 alert창 띄운 후 홈 디렉토리로 라우트
   * 실패 시 alert창을 띄움
   * @returns
   */
  const createMember = async (event: FormEvent) => {
    event.preventDefault();
    const member = {
      email: email,
      password: password,
      name: name,
    };
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/member/signup`,
      "POST",
      member
    );
    if (res.ok) {
      alert("회원 가입에 성공 하였습니다.");
      router.push("/signin");
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("회원가입에 실패하였습니다");
    }
  };

  const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const changePassowrdHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };
  const changePasswordCheckHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(event.target.value);
  };
  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">회원가입</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={changeEmailHandler}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={changePassowrdHandler}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password 확인
            </label>
            <input
              type="password"
              value={passwordCheck}
              onChange={changePasswordCheckHandler}
              className={
                "border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full " +
                (password !== passwordCheck && "bg-red-300")
              }
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              닉네임
            </label>
            <input
              type="text"
              value={name}
              onChange={changeNameHandler}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="button"
              onClick={createMember}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">회원 가입</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
