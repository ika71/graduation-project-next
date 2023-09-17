"use client";

import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { ChangeEvent, useContext, useState } from "react";

interface Props {
  closeModal: () => void;
  afterUpload: (uploadImages: Image[]) => void;
}

interface UploadSuccess {
  imageList: Image[];
}

interface Image {
  imageId: number;
  originName: string;
}

/**
 * 게시판 이미지 업로드 모달
 * @param closeModal: () => void 모달창을 닫을 때 실행할 함수
 * @param afterUpload: (uploadImages: Image[]) => void 업로드 이후에 실행할 함수
 * 업로드한 이미지의 정보를 매개변수로 넘긴다.
 */
const BoardImageModal = (props: Props) => {
  const { closeModal, afterUpload } = props;
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const userContext = useContext(UserContext);
  if (!userContext || userContext.userName === "") return <></>;

  const uploadFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files.length > 5) {
      alert("이미지는 최대 5장까지 업로드 할 수 있습니다.");
      return;
    }
    const addFiles = Array.from(event.target.files);
    setUploadFiles((prev) => prev.concat(addFiles));
  };

  const uploadFileRequest = async () => {
    if (uploadFiles.length === 0) return;
    const formData = new FormData();
    uploadFiles.forEach((uploadFile) =>
      formData.append("imageFile", uploadFile)
    );

    const res = await userContext.authRequest(
      `${backendUrl}/image`,
      "POST",
      formData
    );
    if (res.ok) {
      const uploadSuccess: UploadSuccess = await res.json();
      const uploadImages = uploadSuccess.imageList;
      afterUpload(uploadImages);
      closeModal();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("이미지 업로드에 실패하였습니다.");
    }
  };

  return (
    <div className="fixed z-30 inset-0 flex justify-center items-center overflow-y-auto">
      <div
        id="backdrop"
        onClick={closeModal}
        className="fixed h-screen w-full left-0 top-0 bg-gray-500 opacity-75"
      ></div>

      <div className="absolute top-auto bg-white rounded shadow-lg w-10/12 md:w-1/3 transform">
        <div className="border-b px-4 py-2">
          <h3 className="font-semibold text-lg">이미지 업로드</h3>
        </div>

        <div className="p-3 text-center">
          <input
            id="imageUpload"
            type="file"
            multiple
            onChange={uploadFileChange}
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            파일선택
          </label>
        </div>

        <div className="p-3 text-center">
          {uploadFiles.map((uploadFile, index) => {
            return (
              <p key={index}>
                {uploadFile.name}{" "}
                <svg
                  onClick={() => {
                    setUploadFiles((prev) =>
                      prev.filter((filterFile) => filterFile !== uploadFile)
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

        <div className="p-3 text-center"></div>
        <div className="flex justify-end gap-x-5 items-center w-100 border-t p-3">
          <button
            onClick={uploadFileRequest}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            업로드
          </button>
          <button
            onClick={closeModal}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardImageModal;
