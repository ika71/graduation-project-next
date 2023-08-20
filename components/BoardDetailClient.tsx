"use client";

import { authReqeustWithOutBody } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props {
  boardId: number;
}
/**
 * @param boardId: 읽을 게시글의 id
 * @returns
 */
const BoardDetailClient = ({ boardId, children }: PropsWithChildren<Props>) => {
  const router = useRouter();

  const deleteBoard = async () => {
    const res = await authReqeustWithOutBody(
      `${backendUrl}/board/${boardId}`,
      "DELETE"
    );
    if (res.ok) {
      alert("삭제하였습니다.");
      router.back();
      router.refresh();
    } else if (res.status === 403) {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
    } else {
      alert("삭제에 실패하였습니다");
    }
  };

  return (
    <>
      {children}
      <Link href={`/board/${boardId}/modify`}>
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
          수정
        </button>
      </Link>
      <button
        onClick={deleteBoard}
        className="my-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mr-3"
      >
        삭제
      </button>
    </>
  );
};

export default BoardDetailClient;
