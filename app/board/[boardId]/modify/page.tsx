"use client";

import BoardImageModal from "@/components/modal/board/BoardImageModal";
import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdTime: string;
  imageList: number[];
}

interface Image {
  imageId: number;
  originName: string;
}

const BoardModifyPage = ({ params }: { params: { boardId: number } }) => {
  const boardId = params.boardId;
  const router = useRouter();
  const userContext = useContext(UserContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const [boardImageIds, setBoardImageIds] = useState<number[]>([]);
  const [uploadImages, setUploadImages] = useState<Image[]>([]);

  const [deleteBoardImages, setDeleteBoardImages] = useState<number[]>([]);

  const fetchData = async () => {
    const res = await fetch(`${backendUrl}/board/${boardId}`);
    const boardDetail: BoardDetail = await res.json();
    setBoardDetail(boardDetail);
    setBoardImageIds(boardDetail.imageList);
  };

  const modifyBoard = async (event: FormEvent) => {
    event.preventDefault();
    if (!titleRef.current || !contentRef.current || !userContext) {
      return;
    }
    if (!titleRef.current.value.trim()) {
      alert("제목은 비어 있을 수 없습니다.");
      return;
    }
    if (!contentRef.current.value.trim()) {
      alert("본문은 비어 있을 수 없습니다.");
      return;
    }
    if (boardImageIds.length + uploadImages.length > 5) {
      alert("한 게시글에 이미지는 최대 5개만 가능합니다");
      return;
    }
    let addImageIdList: number[] = [];
    uploadImages.forEach((uploadImage) =>
      addImageIdList.push(uploadImage.imageId)
    );
    const modifyBoard = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      addImageIdList: addImageIdList,
      deleteImageIdList: deleteBoardImages,
    };
    const res = await userContext.authRequest(
      `${backendUrl}/board/${boardId}`,
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

  useEffect(() => {
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

  const openUploadModal = (event: FormEvent) => {
    event.preventDefault();
    setShowUploadModal(true);
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };
  const afterUpload = (uploadImages: Image[]) => {
    setUploadImages((prev) => prev.concat(uploadImages));
  };

  return (
    <>
      {showUploadModal && (
        <BoardImageModal
          closeModal={closeUploadModal}
          afterUpload={afterUpload}
        />
      )}
      <form className="py-10 md:px-40 bg-gray-100">
        <div className="flex flex-col gap-y-5 border border-gray-500 min-h-screen py-10 px-4 md:px-20 shadow bg-white">
          <div>
            <input
              defaultValue={boardDetail.title}
              ref={titleRef}
              type="text"
              placeholder="제목을 입력하세요"
              className="border border-gray-500 pl-4 py-2 w-2/3 bg-blue-50 mr-5 mb-5"
            ></input>
            <button
              onClick={openUploadModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >
              이미지 업로드
            </button>
          </div>

          {boardImageIds.map((imageId) => {
            return (
              <div key={imageId} className="md:relative">
                <Image
                  src={`${backendUrl}/image/${imageId}`}
                  alt={imageId.toString()}
                  width={400}
                  height={400}
                  priority={true}
                  className="w-full md:w-2/3 h-auto inline-block"
                />
                <button
                  onClick={() => {
                    setBoardImageIds((prev) =>
                      prev.filter((filterImageId) => filterImageId !== imageId)
                    );
                    setDeleteBoardImages((prev) => prev.concat(imageId));
                  }}
                  className="w-full md:absolute my-4 md:w-fit md:mx-2 md:my-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  이미지 삭제
                </button>
              </div>
            );
          })}

          <textarea
            defaultValue={boardDetail.content}
            ref={contentRef}
            rows={20}
            placeholder="내용을 입력하세요"
            className="border border-gray-500 pl-4 pt-1 bg-blue-50"
          ></textarea>
          <div>
            첨부이미지:
            {uploadImages.length === 0 && <span> 없음</span>}
            {uploadImages &&
              uploadImages.map((uploadImage) => {
                return (
                  <p key={uploadImage.imageId}>
                    {uploadImage.originName}
                    <svg
                      onClick={() => {
                        setUploadImages((prev) =>
                          prev.filter(
                            (filterImage) => filterImage !== uploadImage
                          )
                        );
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </p>
                );
              })}
          </div>
          <div className="text-right">
            <button
              onClick={modifyBoard}
              className="w-full md:w-fit md:mx-2 md:my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >
              수정
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default BoardModifyPage;
