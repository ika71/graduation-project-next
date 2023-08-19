"use client";

import { PropsWithChildren } from "react";

interface Props {
  boardId: number;
}
/**
 * @param boardId: 읽을 게시글의 id
 * @returns
 */
const BoardDetailClient = ({ boardId, children }: PropsWithChildren<Props>) => {
  return (
    <>
      {children}
      <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
        수정
      </button>
      <button className="my-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mr-3">
        삭제
      </button>
    </>
  );
};

export default BoardDetailClient;
