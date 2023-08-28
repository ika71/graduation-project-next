import { backendUrl } from "@/url/backendUrl";
import PaginationComponent from "./PaginationComponent";
import Link from "next/link";

interface Props {
  deviceId: number;
  currentPage: number;
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
 * @param deviceId: 가져올 게시글과 연관된 전자제품의 id
 * @param currentPage: 게시글 페이징에 사용할 현재 페이지 위치
 * @returns
 */
const DeviceBoardServer = async (props: Props) => {
  const { deviceId, currentPage } = props;

  const size = 10;

  const res = await fetch(
    `${backendUrl}/board?page=${currentPage}&size=${size}&deviceId=${deviceId}`,
    { cache: "no-store" }
  );

  const fetchData: FetchData = await res.json();

  const totalCount = fetchData.totalCount;
  const boardList = fetchData.boardList;

  return (
    <>
      <table className="min-w-full border-collapse block md:table my-5">
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
          {boardList.map((board) => (
            <tr
              key={board.id}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/4 md:hidden font-bold">
                  제목
                </span>
                <span className="hover:underline hover:cursor-pointer">
                  <Link href={`/board/${board.id}`}>{board.title}</Link>
                </span>
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/4 md:hidden font-bold">
                  작성자
                </span>
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
      <div className="my-5">
        <PaginationComponent
          url={`?boardPage=`}
          currentPage={currentPage}
          totalCount={totalCount}
          size={10}
        />
      </div>
    </>
  );
};

export default DeviceBoardServer;
