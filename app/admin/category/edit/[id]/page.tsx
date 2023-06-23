"use client";

import { authReqeust } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const CategoryEditPage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const categoryName = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const editCategory = async () => {
    if (!categoryName.current) {
      return;
    }
    const categoryDto = {
      id: id,
      name: categoryName.current.value,
    };
    const res = await authReqeust(
      `${backendUrl}/admin/category`,
      "PATCH",
      categoryDto
    );
    if (res.ok) {
      router.push("/admin/category/1");
    } else {
      alert("카테고리 수정을 실패하였습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          카테고리 이름 수정
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              카테고리 이름
            </label>
            <input
              type="text"
              placeholder="수정할 이름"
              ref={categoryName}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="button"
              onClick={editCategory}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">수정</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditPage;
