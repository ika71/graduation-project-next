import UserContext from "@/context/userContext";
import { apiUrl } from "@/url/backendUrl";
import { FormEvent, useContext, useRef } from "react";

interface Props {
  categoryId: number;
  prevName: string;
  closeModal: () => void;
  afterEdit: () => void;
}
/**
 * 전자제품 수정 기능이 있는 모달
 * @param categoryId:number 수정할 카테고리 id 값
 * @param prevName:string 수정할 카테고리의 기존 이름
 * @param closeModal:()=>void 모달의 close 버튼을 눌렀을 때 실행될 함수
 * @param afterEdit:()=>void 수정 후에 실행될 함수
 * @returns
 */
const CategoryEditModal = (props: Props) => {
  const { categoryId, prevName, closeModal, afterEdit } = props;
  const userContext = useContext(UserContext);

  const categoryName = useRef<HTMLInputElement>(null);

  const editCategory = async (event: FormEvent) => {
    event.preventDefault();
    if (!categoryName.current || !userContext) {
      return;
    }
    if (categoryName.current.value.trim().length === 0) {
      alert("이름을 입력하세요");
      return;
    }
    const editCategory = {
      name: categoryName.current.value,
    };
    const res = await userContext.authRequest(
      `${apiUrl}/admin/category/${categoryId}`,
      "PUT",
      editCategory
    );
    if (res.ok) {
      afterEdit();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("카테고리 수정에 실패하였습니다.");
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
              <form className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  카테고리 이름
                </label>
                <input
                  type="text"
                  defaultValue={prevName}
                  ref={categoryName}
                  className="border-2 border-blue-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <button
                  onClick={editCategory}
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">수정하기</span>
                </button>
              </form>
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

export default CategoryEditModal;
