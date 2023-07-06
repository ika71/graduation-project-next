"use client";

import { authReqeust, authReqeustWithOutBody } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CategoryAllDto {
  id: number;
  name: string;
}

interface FetchData {
  categoryAllDtoList: CategoryAllDto[];
}

const DeviceEditPage = ({ params }: { params: { deviceId: number } }) => {
  const deviceId = params.deviceId;
  const deviceName = useRef<HTMLInputElement>(null);
  const selectCategoryId = useRef<HTMLSelectElement>(null);

  const router = useRouter();
  const [categoryAllDtoList, setCategoryViewDtoList] =
    useState<CategoryAllDto[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await authReqeustWithOutBody(
        `${backendUrl}/admin/category/all`,
        "GET"
      );
      const fetchData: FetchData = await res.json();
      setCategoryViewDtoList(fetchData.categoryAllDtoList);
    };

    fetch();
  }, []);

  /*
   * useEffect 실행 전에 보여줄 화면
   */
  if (categoryAllDtoList === undefined) {
    return <div>로딩 중</div>;
  }

  const editDevice = async () => {
    if (!deviceName.current || !selectCategoryId.current) {
      return;
    }
    const deviceDto = {
      name: deviceName.current.value,
      categoryId: selectCategoryId.current.value,
    };
    const res = await authReqeust(
      `${backendUrl}/admin/device/${deviceId}`,
      "PATCH",
      deviceDto
    );
    if (res.ok) {
      router.push("/admin/device");
    } else {
      alert("전자제품 수정을 실패하였습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">전자제품 수정</h1>

        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              전자제품의 카테고리
            </label>
            <div className="mt-1 mb-5">
              <select ref={selectCategoryId} className="border-2 border-black">
                {categoryAllDtoList.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              전자제품 이름
            </label>
            <input
              type="text"
              ref={deviceName}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="button"
              onClick={editDevice}
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

export default DeviceEditPage;
