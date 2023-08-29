"use client";

import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface Props {
  boardDetail: BoardDetail;
}

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdTime: string;
}

/**
 * @param boardDetail 게시글 정보
 * @returns
 */
const BoardDetailClient = (props: Props) => {
  const { boardDetail } = props;
  const boardId = boardDetail.id;

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
      <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">
        {boardDetail.title}
      </h1>
      <div className="space-y-4">
        <div>
          <textarea
            id="content"
            cols={30}
            rows={10}
            defaultValue={boardDetail.content}
            readOnly={true}
            className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="name" className="text-lx font-serif">
            작성자
          </label>
          <input
            defaultValue={boardDetail.createdBy}
            readOnly={true}
            type="text"
            placeholder="name"
            id="name"
            className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-lx font-serif">
            작성일
          </label>
          <input
            defaultValue={boardDetail.createdTime}
            readOnly={true}
            type="text"
            placeholder="name"
            id="email"
            className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
          />
        </div>
      </div>
      {userContext.isLogin &&
        userContext.userName === boardDetail.createdBy && (
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
