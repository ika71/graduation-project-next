"use client";

import { authReqeust } from "@/auth/LoginService";
import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";

const BoardAddPage = ({
  searchParams,
}: {
  searchParams: { deviceId: number };
}) => {
  const deviceId = searchParams.deviceId;
  const router = useRouter();
  const userContext = useContext(UserContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  if (!userContext) {
    return <></>;
  }
  const isLogin = userContext.isLogin;

  if (isLogin === false) {
    alert("로그인이 필요합니다.");
    router.push("/signin");
  }

  const createBoard = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleRef.current || !contentRef.current) {
      return;
    }

    let board = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    const res = await authReqeust(
      `${backendUrl}/board?deviceId=${deviceId}`,
      "POST",
      board
    );
    if (res.ok) {
      router.push(`/device/${deviceId}`);
      router.refresh();
    } else {
      alert(await res.text());
    }
  };

  return (
    <>
      <form>
        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
          <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
              ADD POST
            </h1>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="text-lx font-serif">
                  Title:
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="title"
                  id="title"
                  className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  ref={contentRef}
                  cols={30}
                  rows={10}
                  placeholder="whrite here.."
                  className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
                ></textarea>
              </div>
              <button
                onClick={createBoard}
                className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  "
              >
                ADD POST
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default BoardAddPage;
