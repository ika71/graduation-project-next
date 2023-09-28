"use client";

import { backendUrl } from "@/url/backendUrl";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import UserContext from "@/context/userContext";

interface Props {
  boardId: number;
  currentPage: number;
}

interface FetchData {
  boardCommentList: BoardComment[];
  totalCount: number;
}

interface BoardComment {
  id: number;
  comment: string;
  createdBy: string;
  createdTime: string;
}
/**
 * 게시글에 달린 댓글을 보여주는 컴포넌트
 * @param boardId: number 게시글 번호
 * @param currentPage: number 댓글 페이지 번호
 * @returns
 */
const BoardCommentClient = (props: Props) => {
  const { boardId, currentPage } = props;
  const [boardCommentList, setBoardCommentList] = useState<BoardComment[]>();
  const [totalCount, setTotalCount] = useState<number>();
  const commentInput = useRef<HTMLInputElement>(null);
  const userContext = useContext(UserContext);
  const size = 10;

  const fetchData = async () => {
    const res = await fetch(
      `${backendUrl}/board/${boardId}/comment?page=${currentPage}&size=${size}`
    );
    const fetchData: FetchData = await res.json();
    setBoardCommentList(fetchData.boardCommentList);
    setTotalCount(fetchData.totalCount);
  };

  const createComment = async (event: FormEvent) => {
    event.preventDefault();
    if (!commentInput.current || !userContext) {
      return;
    }
    if (commentInput.current.value.trim() === "") {
      alert("댓글을 입력하세요");
      return;
    }
    const comment = commentInput.current.value;
    const res = await userContext.authRequest(
      `${backendUrl}/board/${boardId}/comment`,
      "POST",
      { comment: comment }
    );
    if (res.ok) {
      fetchData();
      commentInput.current.value = "";
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("댓글 작성에 실패하였습니다.");
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/board/${boardId}/comment/${commentId}`,
      "DELETE"
    );
    if (res.ok) {
      fetchData();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("댓글 삭제에 실패하였습니다.");
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!boardCommentList || totalCount === undefined) {
    return <div>Loading...</div>;
  }
  if (!userContext) {
    return <></>;
  }
  const { userName, isLogin } = userContext;

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">댓글 목록</h1>
        <table className="min-w-full border-collapse block md:table">
          <tbody className="block md:table-row-group">
            {boardCommentList.map((comment) => (
              <tr
                key={comment.id}
                className={
                  "border border-grey-500 bg-white md:border-none block md:table-row"
                }
              >
                <td className="break-all md:w-3/5 p-2 md:border-b-2 md:border-grey-500 text-left block md:table-cell">
                  {comment.comment}
                </td>
                <td className="break-all md:w-1/5 p-2 text-left md:text-center md:border-b-2 md:border-grey-500 block md:table-cell font-semibold">
                  {comment.createdBy}
                </td>
                <td className="md:w-1/5 p-2 md:border-b-2 md:border-grey-500 text-right block md:table-cell">
                  <div className="flex justify-end">
                    {comment.createdTime}
                    {isLogin && userName === comment.createdBy && (
                      <button onClick={() => deleteComment(comment.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLogin && (
          <form className="flex my-4">
            <input
              ref={commentInput}
              type="text"
              placeholder="댓글을 입력하세요"
              className="w-full pl-2 py-4 rounded-l-md border border-gray-300"
            />
            <button
              onClick={createComment}
              className="bg-blue-500 w-20 text-white px-4 py-2 rounded-r-md"
            >
              작성
            </button>
          </form>
        )}
        <PaginationComponent
          url="?commentPage="
          currentPage={currentPage}
          totalCount={totalCount}
          size={size}
          scroll={false}
        />
      </div>
    </>
  );
};
export default BoardCommentClient;
