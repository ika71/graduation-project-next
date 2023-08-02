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

const DeviceBoardServer = async (props: Props) => {
  const deviceId = props.deviceId;
  const currentPage = props.currentPage;

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
      <div className="w-2/3 mx-auto">
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
          글쓰기
        </button>
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
            {boardList.map((board) => (
              <tr
                key={board.id}
                className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell hover:underline hover:cursor-pointer">
                  <span className="inline-block w-1/4 md:hidden font-bold">
                    제목
                  </span>
                  <Link href={`/board/${board.id}`}>{board.title}</Link>
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
      </div>
      <PaginationComponent
        url={`/device/${deviceId}?page=`}
        currentPage={currentPage}
        totalCount={totalCount}
        size={10}
      />
    </>
  );
};

export default DeviceBoardServer;
