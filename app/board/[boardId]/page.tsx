import BoardDetailClient from "@/components/BoardDetailClient";
import BoardDetailServer from "@/components/BoardDetailServer";

const BoardDetailPage = ({ params }: { params: { boardId: number } }) => {
  const boardId = params.boardId;

  return (
    <>
      <BoardDetailClient boardId={boardId}>
        <BoardDetailServer boardId={boardId} />
      </BoardDetailClient>
    </>
  );
};

export default BoardDetailPage;
