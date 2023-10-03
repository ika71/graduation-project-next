"use client";

import UserContext from "@/context/userContext";
import { apiUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useContext, useState } from "react";

interface UploadSuccess {
  imageList: Image[];
}

interface Image {
  imageId: number;
  originName: string;
}

const DeviceImageSetPage = ({ params }: { params: { deviceId: number } }) => {
  const deviceId = params.deviceId;
  const userContext = useContext(UserContext);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File>();
  const [imageId, setImageId] = useState<number>();
  const [imageOriginName, setImageOriginName] = useState<string>("없음");

  const router = useRouter();

  const uploadFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUploadFile(event.target.files[0]);
  };

  const uploadFileRequest = async () => {
    if (!uploadFile || !userContext) return;
    const formData = new FormData();
    formData.append("imageFile", uploadFile);

    const res = await userContext.authRequest(
      `${apiUrl}/image`,
      "POST",
      formData
    );
    if (res.ok) {
      const uploadSuccess: UploadSuccess = await res.json();
      uploadSuccess.imageList.map((image) => {
        setImageId(image.imageId);
        setImageOriginName(image.originName);
      });
      closeUploadModal();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("이미지 업로드에 실패하였습니다.");
    }
  };
  const deviceImageSet = async () => {
    if (!userContext) {
      return;
    }
    const json = {
      imageId: imageId,
    };
    const res = await userContext.authRequest(
      `${apiUrl}/admin/device/${deviceId}/image`,
      "POST",
      json
    );
    if (res.ok) {
      alert("이미지 저장에 성공하였습니다.");
      router.push("/admin/device");
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("이미지 저장에 실패하였습니다.");
    }
  };
  const openUploadModal = () => {
    setShowUploadModal(true);
  };
  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  return (
    <div>
      {showUploadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                onClick={closeUploadModal}
                className="absolute inset-0 bg-gray-500 opacity-75"
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      이미지 업로드
                    </h3>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={uploadFileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-end">
                <button
                  onClick={uploadFileRequest}
                  className="my-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  업로드
                </button>
                <button
                  onClick={closeUploadModal}
                  className="my-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 w-full mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">이미지 설정</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                {`현재 선택된 파일: ${imageOriginName}`}
              </label>
              <button
                onClick={openUploadModal}
                type="button"
                className="my-5 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">이미지 업로드</span>
              </button>
              <button
                onClick={deviceImageSet}
                type="button"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">저장</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceImageSetPage;
