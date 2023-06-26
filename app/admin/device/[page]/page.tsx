"use client";
import { authReqeustWithOutBody } from "@/auth/LoginService";
import PaginationComponent from "@/components/PaginationComponent";
import { backendUrl } from "@/url/backendUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryDto {
  id: number;
  name: string;
}
interface DevicePagingDto {
  id: number;
  name: string;
  categoryDto: CategoryDto;
}

interface FetchData {
  devicePagingDtoList: DevicePagingDto[];
  totalCount: number;
}

const DevicePage = ({ params }: { params: { page: number } }) => {
  const currentPage = params.page; //현재 페이지
  const size = 10; //페이지에 보여줄 전자제품 크기

  const router = useRouter();

  const [devicePagingDtoList, setDevicePagingDtoList] =
    useState<DevicePagingDto[]>(); //전자제품 목록
  const [totalCount, setTotalCount] = useState<number>(0); //모든 전자제품 크기

  /*
   * 클라이언트 window 객체가 정의되어야만 로컬스토리지에 접근 가능
   * 따라서 useEffect안에서 authRequest 실행
   */
  useEffect(() => {
    const fetch = async () => {
      const res = await authReqeustWithOutBody(
        `${backendUrl}/admin/device?page=${currentPage}&size=${size}`,
        "GET"
      );
      const fetchData: FetchData = await res.json();
      setDevicePagingDtoList(fetchData.devicePagingDtoList);
      setTotalCount(fetchData.totalCount);
    };

    fetch();
  }, [currentPage]);

  /*
   * useEffect 실행 전에 보여줄 화면
   */
  if (devicePagingDtoList === undefined) {
    return <div>로딩 중</div>;
  }

  const deleteDevice = async (id: number) => {
    const res = await authReqeustWithOutBody(
      `${backendUrl}/admin/device?id=${id}`,
      "DELETE"
    );
    if (res.ok) {
      // 전자제품 삭제 후, devicePagingDtoList와 totalCount 상태를 갱신
      const updatedDeviceList = devicePagingDtoList.filter(
        (device) => device.id !== id
      );
      setDevicePagingDtoList(updatedDeviceList);

      setTotalCount((prevTotalCount) => prevTotalCount - 1); // totalCount를 1 감소
      router.push("/admin/device/1");
    } else {
      alert("전자제품 삭제에 실패하였습니다.");
    }
  };

  return (
    <div>
      <Link href="/admin/device/add">
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
          전자제품 추가
        </button>
      </Link>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Device Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Category Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {devicePagingDtoList.map((device) => (
            <tr
              key={device.id}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Device Name
                </span>
                {device.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Category Name
                </span>
                {device.categoryDto.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <Link href={`/admin/device/edit/${device.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteDevice(device.id)}
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
          url={"/admin/device/"}
          size={size}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default DevicePage;
