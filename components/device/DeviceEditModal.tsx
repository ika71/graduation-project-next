import { authReqeust, authReqeustWithOutBody } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import { useEffect, useRef, useState } from "react";

interface Props {
  deviceId: number;
  prevCategoryId: number;
  prevName: string;
  closeModal: () => void;
  afterEdit: () => void;
}

interface CategoryAllDto {
  id: number;
  name: string;
}

interface FetchData {
  categoryAllDtoList: CategoryAllDto[];
}

/**
 * 전자제품 수정 기능이 있는 모달
 * @param deviceId:number 수정할 전자제품 id 값
 * @param prevCategoryId:number 수정할 전자제품의 기존 카테고리 id
 * @param prevName:string 수정할 전자제품의 기존 이름
 * @param closeModal:()=>void 모달의 close 버튼을 눌렀을 때 실행될 함수
 * @param afterEdit:()=>void 수정 후에 실행될 함수
 * @returns
 */
const DeviceEditModal = (props: Props) => {
  const deviceId = props.deviceId;
  const prevName = props.prevName;
  const prevCategoryId = props.prevCategoryId;
  const closeModal = props.closeModal;
  const afterEdit = props.afterEdit;

  const deviceName = useRef<HTMLInputElement>(null);
  const selectCategoryId = useRef<HTMLSelectElement>(null);

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
      afterEdit();
    } else {
      alert(await res.text());
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
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
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  전자제품의 카테고리
                </label>
                <div className="mt-1 mb-5">
                  <select
                    ref={selectCategoryId}
                    defaultValue={prevCategoryId}
                    className="border-2 border-black"
                  >
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
                  defaultValue={prevName}
                  ref={deviceName}
                  className="border rounded-lg pr-64 px-3 py-2 mt-1 mb-5 text-sm w-full"
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
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceEditModal;
