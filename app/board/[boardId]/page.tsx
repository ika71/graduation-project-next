import BoardCommentClient from "@/components/BoardCommentClient";
import BoardDetailClient from "@/components/BoardDetailClient";
import { backendUrl } from "@/url/backendUrl";
import { notFound } from "next/navigation";

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
  if (!res.ok) {
    return notFound();
  }
  const boardDetail = await res.json();

  return (
    <>
      <BoardDetailClient boardDetail={boardDetail} />
      <BoardCommentClient boardId={boardId} currentPage={currentPage} />
    </>
  );
};

export default BoardDetailPage;
