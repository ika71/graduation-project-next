"use client";

import { authReqeust } from "@/auth/LoginService";
import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdTime: string;
}

const BoardModifyPage = ({ params }: { params: { boardId: number } }) => {
  const boardId = params.boardId;
  const router = useRouter();
  const userContext = useContext(UserContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [boardDetail, setBoardDetail] = useState<BoardDetail>();

  const fetchData = async () => {
    const res = await fetch(`${backendUrl}/board/${boardId}`);
    const boardDetail: BoardDetail = await res.json();
    setBoardDetail(boardDetail);
  };

  const modifyBoard = async () => {
    if (!titleRef.current || !contentRef.current) {
      return;
    }
    const modifyBoard = {
      title: titleRef.current.value,
      content: contentRef.current.value,
    };
    const res = await authReqeust(
      `${backendUrl}/board/${boardId}`,
      "PATCH",
      modifyBoard
    );
    if (res.ok) {
      router.push(`/board/${boardId}`);
      router.refresh();
    } else {
      alert("수정에 실패하였습니다");
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!boardDetail) {
    return <></>;
  }
  if (!userContext) {
    return <></>;
  }
  const { userName, isLogin } = userContext;
  if (isLogin === false) {
    alert("로그인이 필요합니다.");
    router.push("/signin");
  }
  if (userName !== boardDetail.createdBy) {
    alert("본인이 작성한 글만 수정할 수 있습니다.");
    router.back();
  }
  return (
    <>
      <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
        <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
          <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
            MODIFY POST
          </h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="text-lx font-serif">
                Title:
              </label>
              <input
                defaultValue={boardDetail.title}
                ref={titleRef}
                type="text"
                placeholder="title"
                id="title"
                className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div>
              <textarea
                defaultValue={boardDetail.content}
                id="description"
                ref={contentRef}
                cols={30}
                rows={10}
                placeholder="whrite here.."
                className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
              ></textarea>
            </div>
            <button
              onClick={modifyBoard}
              className=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  "
            >
              MODIFY POST
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BoardModifyPage;
