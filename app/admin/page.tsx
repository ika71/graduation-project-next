import Link from "next/link";

const AdminMainPage = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-50 h-screen flex justify-center items-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">
                  카테고리 관리
                </h2>
                <Link href={"/admin/category"}>
                  <button className="text-sm mt-6 px-4 py-2 bg-yellow-400 text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none">
                    이동
                  </button>
                </Link>
              </div>
              <div className="bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white text-2xl">카테고리</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">
                  전자제품 관리
                </h2>
                <button className="text-sm mt-6 px-4 py-2 bg-orange-400  text-white rounded-lg  tracking-wider hover:bg-orange-500 outline-none">
                  이동
                </button>
              </div>
              <div className="bg-gradient-to-tr from-orange-500 to-orange-400 w-32 h-32  rounded-full shadow-2xl shadow-orange-400 border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white text-2xl">전자제품</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">
                  평가항목 관리
                </h2>
                <button className="text-sm mt-6 px-4 py-2 bg-red-400  text-white rounded-lg  tracking-wider hover:bg-red-500 outline-none">
                  이동
                </button>
              </div>
              <div className="bg-gradient-to-tr from-red-500 to-red-400 w-32 h-32  rounded-full shadow-2xl shadow-red-400 border-white  border-dashed border-2  flex justify-center items-center ">
                <div>
                  <h1 className="text-white text-2xl">평가항목</h1>
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
