import { backendUrl } from "@/url/backendUrl";

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdTime: string;
}

const BoardDetailPage = async ({ params }: { params: { boardId: number } }) => {
  const boardId = params.boardId;
  const res = await fetch(`${backendUrl}/board/${boardId}`, {
    cache: "no-store",
  });
  const boardDetail: BoardDetail = await res.json();

  return (
    <>
      <form>
        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
          <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
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
              <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
                수정
              </button>
              <button className="my-5 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded mr-3">
                삭제
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BoardDetailPage;
