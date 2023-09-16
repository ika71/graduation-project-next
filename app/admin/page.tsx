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
            <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">
                  카테고리 관리
                </h2>
              </div>
              <div className="bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white text-2xl">카테고리</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => router.push("/admin/device")}
            className="cursor-pointer p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500"
          >
            <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">
                  전자제품 관리
                </h2>
              </div>
              <div className="bg-gradient-to-tr from-orange-500 to-orange-400 w-32 h-32  rounded-full shadow-2xl shadow-orange-400 border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white text-2xl">전자제품</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminMainPage;
