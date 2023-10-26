"use client";

import TipTap from "@/components/tiptap/Tiptap";
import UserContext from "@/context/userContext";
import { apiUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import react from "react";

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdTime: string;
  imageList: number[];
}

const BoardModifyPage = ({ params }: { params: { boardId: number } }) => {
  const boardId = params.boardId;
  const router = useRouter();
  const userContext = react.useContext(UserContext);

  const titleRef = react.useRef<HTMLInputElement>(null);
  const [content, setContent] = react.useState("");

  const [boardDetail, setBoardDetail] = react.useState<BoardDetail>();

  const fetchData = async () => {
    const res = await fetch(`${apiUrl}/board/${boardId}`);
    const boardDetail: BoardDetail = await res.json();
    setBoardDetail(boardDetail);
    setContent(boardDetail.content);
  };

  const modifyBoard = async () => {
    if (!titleRef.current || !userContext) {
      return;
    }
    if (!titleRef.current.value.trim()) {
      alert("제목은 비어 있을 수 없습니다.");
      return;
    }
    if (!content.trim()) {
      alert("본문은 비어 있을 수 없습니다.");
      return;
    }
    const modifyBoard = {
      title: titleRef.current.value,
      content: content,
    };
    const res = await userContext.authRequest(
      `${apiUrl}/board/${boardId}`,
      "PATCH",
      modifyBoard
    );
    if (res.ok) {
      router.push(`/board/${boardId}`);
      router.refresh();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("수정에 실패하였습니다.");
    }
  };

  react.useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!boardDetail) {
    return <></>;
  }
  if (!userContext) {
    return <></>;
  }
  const { userName, isLogin } = userContext;
  if (userName !== "" && isLogin === false) {
    alert("로그인이 필요합니다.");
    router.push("/signin");
  }
  if (userName !== "" && userName !== boardDetail.createdBy) {
    alert("본인이 작성한 글만 수정할 수 있습니다.");
    router.back();
  }

  return (
    <>
      <form className="py-10 md:px-40 bg-gray-100">
        <div className="flex flex-col gap-y-5 border border-gray-500 min-h-screen py-10 px-4 md:px-20 shadow bg-white">
          <div>
            <input
              defaultValue={boardDetail.title}
              ref={titleRef}
              type="text"
              placeholder="제목을 입력하세요"
              className="border border-gray-500 pl-4 py-2 w-2/3 mr-5 mb-5"
            ></input>
          </div>

          <TipTap
            content={content}
            setContent={setContent}
            afterSetContent={modifyBoard}
          />
        </div>
      </form>
    </>
  );
};
export default BoardModifyPage;
