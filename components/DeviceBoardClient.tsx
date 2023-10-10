"use client";

import UserContext from "@/context/userContext";
import Link from "next/link";
import { useContext } from "react";
import PaginationComponent from "./PaginationComponent";
import { useRouter } from "next/navigation";

interface Props {
  currentPage: number;
  deviceId: number;
  fetchData: FetchData;
}

interface FetchData {
  boardList: Board[];
  totalCount: number;
}

interface Board {
  id: number;
  title: string;
  nickName: string;
  view: number;
  createdTime: string;
}

/**
 * @param currentPage: 현재 페이지 위치
 * @param deviceId: 읽을 게시글의 id
 * @param fetchData: 목록으로 보여줄 게시글 데이터와, 전제 게시글 개수(페이징 기능에 필요)
 * @returns
 * @see FetchData
 */
const DeviceBoardClient = (props: Props) => {
  const { deviceId, fetchData, currentPage } = props;
  const { totalCount, boardList } = fetchData;
  const router = useRouter();

  const userContext = useContext(UserContext);
  if (!userContext) {
    return;
  }

  return (
    <div className="mx-auto md:w-2/3">
      {userContext.isLogin && (
        <Link href={`/board/add?deviceId=${deviceId}`}>
          <button className="ml-2 md:ml-0 my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
            글쓰기
          </button>
        </Link>
      )}
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              제목
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              작성자
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              조회수
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              작성시간
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {boardList.map((board, index) => (
            <tr
              key={board.id}
              onClick={() => router.push(`/board/${board.id}`)}
              className={
                "border border-grey-500 md:border-none block md:table-row hover:bg-amber-100 cursor-pointer " +
                (index % 2 === 0 ? "bg-gray-300" : "bg-white")
              }
            >
              <td className="p-2 md:w-2/3 md:border md:border-grey-500 text-left block md:table-cell hover:underline">
                <Link href={`/board/${board.id}`}>
                  <span className="inline-block md:font-normal font-bold md:text-base text-lg">
                    {board.title}
                  </span>
                </Link>
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {board.nickName}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/4 md:hidden font-bold">
                  조회수
                </span>
                {board.view.toString()}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/4 md:hidden font-bold">
                  작성시간
                </span>
                {board.createdTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {boardList.length === 0 && <div>등록된 게시글이 없습니다.</div>}
      <div className="my-5">
        <PaginationComponent
          url={`?boardPage=`}
          currentPage={currentPage}
          totalCount={totalCount}
          size={10}
        />
      </div>
    </div>
  );
};

export default DeviceBoardClient;
