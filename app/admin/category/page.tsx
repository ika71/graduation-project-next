"use client";
import { authReqeustWithOutBody } from "@/auth/LoginService";
import PaginationComponent from "@/components/PaginationComponent";
import CategoryAddModal from "@/components/category/CategoryAddModal";
import CategoryEditModal from "@/components/category/CategoryEditModal";
import { backendUrl } from "@/url/backendUrl";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface FetchData {
  categoryList: Category[];
  totalCount: number;
}

const CategoryPage = ({ searchParams }: { searchParams: { page: number } }) => {
  const currentPage = searchParams.page || 1; //현재 페이지
  const size = 10; //페이지에 보여줄 카테고리 크기

  const [addModalShow, setAddModalShow] = useState(false); //추가모달 제어 변수
  const [editModalShow, setEditModalShow] = useState(false); //수정모달 제어 변수
  const [editCategoryId, setEditCategoryId] = useState(-1); //수정 모달에 전달할 카테고리 id
  const [editPrevName, setEditPrevName] = useState(""); //수정 모달에 전달할 카테고리 이름

  const [categoryList, setCategoryList] = useState<Category[]>(); //카테고리 목록
  const [totalCount, setTotalCount] = useState<number>(0); //모든 카테고리 크기

  /**
   * 카테고리 페이징 요청
   */
  const fetch = async () => {
    const res = await authReqeustWithOutBody(
      `${backendUrl}/admin/category?page=${currentPage}&size=${size}`,
      "GET"
    );
    const fetchData: FetchData = await res.json();
    setCategoryList(fetchData.categoryList);
    setTotalCount(fetchData.totalCount);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!categoryList) {
    return <div>로딩 중</div>;
  }

  const openAddModal = () => {
    setAddModalShow(true);
  };
  const closeAddModal = () => {
    setAddModalShow(false);
  };
  const afterAdd = () => {
    closeAddModal();
    fetch();
  };
  const openEditModal = (categoryId: number, prevName: string) => {
    setEditCategoryId(categoryId);
    setEditPrevName(prevName);
    setEditModalShow(true);
  };
  const closeEditModal = () => {
    setEditModalShow(false);
  };
  const afterEdit = () => {
    setEditModalShow(false);
    fetch();
  };
  const deleteCategory = async (id: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    const res = await authReqeustWithOutBody(
      `${backendUrl}/admin/category/${id}`,
      "DELETE"
    );
    if (res.ok) {
      fetch();
    } else {
      alert(await res.text());
    }
  };

  return (
    <div>
      {addModalShow && (
        <CategoryAddModal closeModal={closeAddModal} afterAdd={afterAdd} />
      )}
      {editModalShow && (
        <CategoryEditModal
          categoryId={editCategoryId}
          prevName={editPrevName}
          closeModal={closeEditModal}
          afterEdit={afterEdit}
        />
      )}
      <button
        onClick={openAddModal}
        className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
      >
        카테고리 추가
      </button>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Category Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {categoryList.map((category) => (
            <tr
              key={category.id}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Name
                </span>
                {category.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button
                  onClick={() => openEditModal(category.id, category.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-8">
        <PaginationComponent
          url={"/admin/category?page="}
          size={size}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
