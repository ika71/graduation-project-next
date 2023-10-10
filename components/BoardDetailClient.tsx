"use client";

import UserContext from "@/context/userContext";
import { apiUrl, backendUrl } from "@/url/backendUrl";
import Image from "next/image";
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
  imageList: number[];
  view: number;
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
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${apiUrl}/board/${boardId}`,
      "DELETE"
    );
    if (res.ok) {
      alert("삭제하였습니다.");
      router.back();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("삭제에 실패하였습니다.");
    }
  };

  if (!userContext) {
    return <></>;
  }

  return (
    <>
      <form className="py-10 md:px-40 bg-gray-100">
        <div className="flex flex-col gap-y-5 border border-gray-500 min-h-screen py-10 px-4 md:px-20 shadow bg-white">
          <div className="py-2 w-2/3 font-semibold text-xl">
            {boardDetail.title}
          </div>
          <p>작성자: {boardDetail.createdBy}</p>
          <p>작성일: {boardDetail.createdTime}</p>
          <p>조회수: {boardDetail.view}</p>
          <div className="bg-gray-300 h-1"></div>

          {boardDetail.imageList.map((imageId) => {
            return (
              <div key={imageId}>
                <Image
                  src={`${backendUrl}/image/${imageId}`}
                  alt={imageId.toString()}
                  width={400}
                  height={400}
                  className="w-full md:w-2/3 h-auto"
                />
              </div>
            );
          })}

          <div className="pt-1">{boardDetail.content}</div>
          {userContext.userName === boardDetail.createdBy && (
            <div className="text-right">
              <Link href={`/board/${boardId}/modify`}>
                <button className="w-full md:w-fit md:mx-2 md:my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
                  수정
                </button>
              </Link>
              <button
                onClick={deleteBoard}
                className="w-full my-4 md:w-fit md:mx-2 md:my-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default BoardDetailClient;
