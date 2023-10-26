"use client";

import TipTap from "@/components/tiptap/Tiptap";
import UserContext from "@/context/userContext";
import { apiUrl } from "@/url/backendUrl";
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
  const { userName, isLogin } = userContext;

  if (userName !== "" && isLogin === false) {
    alert("로그인이 필요합니다.");
    router.push("/signin");
  }

  const createBoard = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleRef.current || !contentRef.current) {
      return;
    }
    if (!titleRef.current.value.trim()) {
      alert("제목은 비어 있을 수 없습니다.");
      return;
    }
    if (!contentRef.current.value.trim()) {
      alert("본문은 비어 있을 수 없습니다.");
      return;
    }

    const board = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    const res = await userContext.authRequest(
      `${apiUrl}/board?deviceId=${deviceId}`,
      "POST",
      board
    );
    if (res.ok) {
      router.push(`/device/${deviceId}`);
      router.refresh();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("게시글 작성에 실패하였습니다.");
    }
  };

  return (
    <>
      <form className="py-10 md:px-40 bg-gray-100">
        <div className="flex flex-col gap-y-5 border border-gray-500 min-h-screen py-10 px-4 md:px-20 shadow bg-white">
          <div>
            <input
              ref={titleRef}
              type="text"
              placeholder="제목을 입력하세요"
              className="border border-gray-500 pl-4 py-2 w-2/3 mr-5 mb-5"
            ></input>
          </div>
          <TipTap />
          <div className="text-right">
            <button
              onClick={createBoard}
              className="w-full md:w-fit md:mx-2 md:my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >
              글 작성
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default BoardAddPage;
