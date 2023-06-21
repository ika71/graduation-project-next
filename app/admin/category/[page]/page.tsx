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
  const [categoryViewDtoList, setCategoryViewDtoList] =
    useState<CategoryViewDto[]>();
  const [totalCount, setTotalCount] = useState<number>();

  const currentPage = params.page;
  const size = 10;

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

  if (categoryViewDtoList === undefined || totalCount === undefined) {
    return <div>로딩 중</div>;
  }

  console.log(totalCount);
  console.log(categoryViewDtoList);

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
            // eslint-disable-next-line react/jsx-key
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
