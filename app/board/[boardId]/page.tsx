import BoardCommentClient from "@/components/BoardCommentClient";
import BoardDetailClient from "@/components/BoardDetailClient";
import { backendUrl } from "@/url/backendUrl";

const BoardDetailPage = async ({
  params,
  searchParams,
}: {
  params: { boardId: number };
  searchParams: { commentPage: number };
}) => {
  const boardId = params.boardId;
  const currentPage = searchParams.commentPage || 1;

  const res = await fetch(`${backendUrl}/board/${boardId}`, {
    cache: "no-store",
  });
  const boardDetail = await res.json();

  return (
    <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
      <div className="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
        <BoardDetailClient boardDetail={boardDetail} />
        <BoardCommentClient boardId={boardId} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default BoardDetailPage;
