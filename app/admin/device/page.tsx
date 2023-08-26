"use client";
import PaginationComponent from "@/components/PaginationComponent";
import DeviceAddModal from "@/components/device/DeviceAddModal";
import DeviceEditModal from "@/components/device/DeviceEditModal";
import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}
interface Device {
  id: number;
  name: string;
  category: Category;
  imageId: number;
}

interface FetchData {
  deviceList: Device[];
  totalCount: number;
}

const DevicePage = ({ searchParams }: { searchParams: { page: number } }) => {
  const currentPage = searchParams.page || 1; //현재 페이지
  const size = 10; //페이지에 보여줄 전자제품 크기

  const userContext = useContext(UserContext);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editDeviceId, setEditDeviceId] = useState<number>();
  const [prevCategoryId, setPrevCategoryId] = useState<number>();
  const [prevName, setPrevName] = useState("");

  const [deviceList, setDeviceList] = useState<Device[]>(); //전자제품 목록
  const [totalCount, setTotalCount] = useState<number>(0); //모든 전자제품 크기

  /**
   * 전자제품 페이징 요청
   */
  const fetch = async () => {
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/admin/device?page=${currentPage}&size=${size}`,
      "GET"
    );
    const fetchData: FetchData = await res.json();
    setDeviceList(fetchData.deviceList);
    setTotalCount(fetchData.totalCount);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!deviceList) {
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
  const openEditModal = (
    deviceId: number,
    prevCategoryId: number,
    prevName: string
  ) => {
    setEditDeviceId(deviceId);
    setPrevCategoryId(prevCategoryId);
    setPrevName(prevName);
    setEditModalShow(true);
  };
  const closeEditModal = () => {
    setEditModalShow(false);
  };
  const afterEdit = () => {
    closeEditModal();
    fetch();
  };
  const deleteDevice = async (id: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/admin/device/${id}`,
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
        <DeviceAddModal closeModal={closeAddModal} afterAdd={afterAdd} />
      )}
      {editModalShow && editDeviceId && prevCategoryId && (
        <DeviceEditModal
          deviceId={editDeviceId}
          prevCategoryId={prevCategoryId}
          prevName={prevName}
          closeModal={closeEditModal}
          afterEdit={afterEdit}
        />
      )}
      <button
        onClick={openAddModal}
        className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
      >
        전자제품 추가
      </button>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Device Image
            </th>
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
          {deviceList.map((device) => (
            <tr
              key={device.id}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Device Name
                </span>
                {device.imageId && (
                  <Image
                    src={`${backendUrl}/image/${device.imageId}`}
                    width={300}
                    height={300}
                    alt={`${device.imageId}`}
                    className="w-auto, h-auto"
                  />
                )}
              </td>
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
                {device.category.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button
                  onClick={() =>
                    openEditModal(device.id, device.category.id, device.name)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                >
                  Edit
                </button>
                <Link href={`/admin/device/${device.id}/evaluationitem`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
                    평가항목 관리
                  </button>
                </Link>
                <Link href={`/admin/device/${device.id}/image`}>
                  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 border border-orange-500 rounded mr-3">
                    이미지 관리
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
          url={"?page="}
          size={size}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default DevicePage;
