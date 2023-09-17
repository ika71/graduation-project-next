"use client";

import BoardImageModal from "@/components/modal/board/BoardImageModal";
import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useRef, useState } from "react";

interface Image {
  imageId: number;
  originName: string;
}

const BoardAddPage = ({
  searchParams,
}: {
  searchParams: { deviceId: number };
}) => {
  const deviceId = searchParams.deviceId;
  const router = useRouter();
  const userContext = useContext(UserContext);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadImages, setUploadImages] = useState<Image[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  if (!userContext) {
    return <></>;
  }
  const { userName, isLogin } = userContext;

  if (userName !== "" && isLogin === false) {
    alert("로그인이 필요합니다.");
    router.push("/signin");
  }

  const createBoard = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleRef.current || !contentRef.current) {
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

    let imageIdList: number[] = [];
    uploadImages.forEach((uploadImage) =>
      imageIdList.push(uploadImage.imageId)
    );
    const board = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      imageIdList: imageIdList,
    };

    const res = await userContext.authRequest(
      `${backendUrl}/board?deviceId=${deviceId}`,
      "POST",
      board
    );
    if (res.ok) {
      router.push(`/device/${deviceId}`);
      router.refresh();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("게시글 작성에 실패하였습니다.");
    }
  };

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
          <textarea
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
              onClick={createBoard}
              className="w-full md:w-fit md:mx-2 md:my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
            >
              글 작성
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default BoardAddPage;
