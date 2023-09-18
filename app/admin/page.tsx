"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminMainPage = () => {
  const router = useRouter();

  return (
    <section className="text-gray-600 body-font bg-gray-50 h-screen flex justify-center items-center ">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 text-center justify-center items-center">
          <div
            onClick={() => router.push("/admin/category")}
            className="cursor-pointer p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500"
          >
            <div className=" flex items-center p-4  rounded-lg bg-white shadow-gray-300 shadow-md">
              <div className="mx-auto h-20 mt-10">
                <h2 className="text-gray-900 text-lg font-bold">
                  카테고리 관리
                </h2>
              </div>
            </div>
          </div>
          <div
            onClick={() => router.push("/admin/device")}
            className="cursor-pointer p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500"
          >
            <div className=" flex items-center p-4 rounded-lg bg-white shadow-gray-300 shadow-md">
              <div className="mx-auto h-20 mt-10">
                <h2 className="text-gray-900 text-lg font-bold">
                  전자제품 관리
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminMainPage;
