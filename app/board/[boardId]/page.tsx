import BoardCommentClient from "@/components/BoardCommentClient";
import BoardDetailClient from "@/components/BoardDetailClient";
import BoardDetailServer from "@/components/BoardDetailServer";

const BoardDetailPage = ({
  params,
  searchParams,
}: {
  params: { boardId: number };
  searchParams: { commentPage: number };
}) => {
  const boardId = params.boardId;
  const currentPage = searchParams.commentPage || 1;

  return (
    <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
      <div className="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
        <BoardDetailClient boardId={boardId}>
          <BoardDetailServer boardId={boardId} />
        </BoardDetailClient>
        <BoardCommentClient boardId={boardId} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default BoardDetailPage;
