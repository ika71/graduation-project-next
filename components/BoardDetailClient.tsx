"use client";

import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useContext } from "react";

interface Props {
  boardId: number;
}
/**
 * @param boardId: 읽을 게시글의 id
 * @returns
 */
const BoardDetailClient = ({ boardId, children }: PropsWithChildren<Props>) => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  const deleteBoard = async () => {
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
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

  if (!userContext) {
    return <></>;
  }

  return (
    <>
      {children}
      {userContext.isLogin && (
        <div>
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
        </div>
      )}
    </>
  );
};

export default BoardDetailClient;
