"use client";

import { PropsWithChildren } from "react";

interface Props {
  boardId: number;
}

const BoardDetailClient = ({ boardId, children }: PropsWithChildren<Props>) => {
  return (
    <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
      <div className="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
        {children}
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
          수정
        </button>
        <button className="my-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mr-3">
          삭제
        </button>
      </div>
    </div>
  );
};

export default BoardDetailClient;
