import { backendUrl } from "@/url/backendUrl";

interface Props {
  boardId: number;
}
interface BoardDetail {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdTime: string;
}
/**
 * @param boardId: 읽을 게시글의 id
 * @returns
 */
const BoardDetailServer = async (props: Props) => {
  const boardId = props.boardId;

  const res = await fetch(`${backendUrl}/board/${boardId}`, {
    cache: "no-store",
  });
  const boardDetail: BoardDetail = await res.json();

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
            value={boardDetail.content}
            className="w-full font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="name" className="text-lx font-serif">
            작성자
          </label>
          <input
            value={boardDetail.createdBy}
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
            value={boardDetail.createdTime}
            type="text"
            placeholder="name"
            id="email"
            className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default BoardDetailServer;
