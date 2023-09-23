import BoardCommentClient from "@/components/BoardCommentClient";
import BoardDetailClient from "@/components/BoardDetailClient";
import { serverFetchBackendUrl } from "@/url/backendUrl";

const BoardDetailPage = async ({
  params,
  searchParams,
}: {
  params: { boardId: number };
  searchParams: { commentPage: number };
}) => {
  const boardId = params.boardId;
  const currentPage = searchParams.commentPage || 1;

  const res = await fetch(`${serverFetchBackendUrl}/board/${boardId}`, {
    cache: "no-store",
  });
  const boardDetail = await res.json();

  return (
    <>
      <BoardDetailClient boardDetail={boardDetail} />
      <BoardCommentClient boardId={boardId} currentPage={currentPage} />
    </>
  );
};

export default BoardDetailPage;
