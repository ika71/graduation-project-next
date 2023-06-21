"use client";
import { authReqeustWithOutBody } from "@/auth/LoginService";
import PaginationComponent from "@/components/PaginationComponent";
import { backendUrl } from "@/url/backendUrl";
import { useEffect, useState } from "react";

interface CategoryViewDto {
  id: number;
  name: string;
}

interface FetchData {
  categoryViewDtoList: CategoryViewDto[];
  totalCount: number;
}

const CategoryPage = ({ params }: { params: { page: number } }) => {
  const currentPage = params.page; //현재 페이지
  const size = 10; //페이지에 보여줄 카테고리 크기

  const [categoryViewDtoList, setCategoryViewDtoList] =
    useState<CategoryViewDto[]>(); //카테고리 목록
  const [totalCount, setTotalCount] = useState<number>(); //모든 카테고리 크기

  /**
   * 클라이언트 window 객체가 정의되어야만 로컬스토리지에 접근 가능
   * 따라서 useEffect안에서 authRequest 실행
   */
  useEffect(() => {
    const fetch = async () => {
      const res = await authReqeustWithOutBody(
        `${backendUrl}/admin/category?page=${currentPage}&size=${size}`,
        "get"
      );
      const fetchData: FetchData = await res.json();
      setCategoryViewDtoList(fetchData.categoryViewDtoList);
      setTotalCount(fetchData.totalCount);
    };

    fetch();
  }, [currentPage]);

  /**
   * useEffect 실행 전에 보여줄 화면
   */
  if (categoryViewDtoList === undefined || totalCount === undefined) {
    return <div>로딩 중</div>;
  }

  return (
    <div>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {categoryViewDtoList.map((category) => (
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-8">
        <PaginationComponent
          url={"/admin/category/"}
          size={size}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
