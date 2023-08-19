"use client";

import { backendUrl } from "@/url/backendUrl";
import { useContext, useEffect, useRef, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { authReqeust, authReqeustWithOutBody } from "@/auth/LoginService";
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
  const size = 20;

  const fetchData = async () => {
    const res = await fetch(
      `${backendUrl}/board/${boardId}/comment?page=${currentPage}&size=${size}`
    );
    const fetchData: FetchData = await res.json();
    setBoardCommentList(fetchData.boardCommentList);
    setTotalCount(fetchData.totalCount);
  };

  const createComment = async () => {
    if (!commentInput.current) {
      return;
    }
    const comment = commentInput.current.value;
    const res = await authReqeust(
      `${backendUrl}/board/${boardId}/comment`,
      "POST",
      { comment: comment }
    );
    if (res.ok) {
      fetchData();
      commentInput.current.value = "";
    } else {
      alert("댓글 작성에 실패하였습니다");
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    const res = await authReqeustWithOutBody(
      `${backendUrl}/board/${boardId}/comment/${commentId}`,
      "DELETE"
    );
    if (res.ok) {
      fetchData();
    } else {
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!boardCommentList || !totalCount) {
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
        <table className="table-auto w-full">
          <tbody>
            {boardCommentList.map((comment) => (
              <tr key={comment.id} className="bg-white">
                <td className="py-2 px-4">
                  <p className="text-gray-600">{comment.comment}</p>
                </td>
                <td className="py-2 px-4">
                  <span className="text-gray-700 font-semibold">
                    {comment.createdBy}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">{comment.createdTime}</span>
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
            {isLogin && (
              <tr className="bg-white">
                <td className="py-2 px-4" colSpan={3}>
                  <div className="flex space-x-4">
                    <input
                      ref={commentInput}
                      type="text"
                      placeholder="댓글을 입력하세요"
                      className="w-full p-2 rounded-l-md border border-gray-300"
                    />
                    <button
                      onClick={createComment}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                    >
                      작성
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <PaginationComponent
          url="?commentPage="
          currentPage={currentPage}
          totalCount={totalCount}
          size={size}
        />
      </div>
    </>
  );
};
export default BoardCommentClient;
