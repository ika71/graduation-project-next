"use client";

import UserContext from "@/context/userContext";
import Link from "next/link";
import { PropsWithChildren, useContext } from "react";

interface Props {
  deviceId: number;
}
/**
 * @param deviceId: 읽을 게시글의 id
 * @returns
 */
const DeviceBoardClient = ({
  deviceId,
  children,
}: PropsWithChildren<Props>) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return;
  }

  return (
    <div className="w-2/3 mx-auto">
      {userContext.isLogin && (
        <Link href={`/board/add?deviceId=${deviceId}`}>
          <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
            글쓰기
          </button>
        </Link>
      )}
      {children}
    </div>
  );
};

export default DeviceBoardClient;
