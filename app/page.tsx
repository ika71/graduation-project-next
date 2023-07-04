import PaginationComponent from "@/components/PaginationComponent";
import { backendUrl } from "@/url/backendUrl";
import Image from "next/image";

interface FetchData {
  devicePagingDtoList: DevicePagingDto[];
  totalCount: number;
}

interface DevicePagingDto {
  id: number;
  name: string;
  categoryName: string;
  imageId: string | null;
  createdTime: string;
  evaluationItemList: string[];
}

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page: number };
}) => {
  const currentPage = searchParams.page || 1;
  const url = "/?page=";
  const size = 8;

  const res = await fetch(
    `${backendUrl}/device?page=${currentPage}&size=${size}`,
    {
      cache: "no-store",
    }
  );
  const fetchData: FetchData = await res.json();
  const devicePagingDtoList: DevicePagingDto[] =
    await fetchData.devicePagingDtoList;

  const totalCount = fetchData.totalCount;

  const formatDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    return year + "-" + month;
  };
  return (
    //     <!-- component -->
    // <!-- Create By Joker Banny -->
    <main className="bg-white">
      {/* <!-- Tab Menu --> */}
      <div className="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>카테고리</span>
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 rounded-t-lg text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>리뷰 글</span>
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>평점 순위</span>
        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex items-center flex-shrink-0 px-5 py-3 space-x-2  text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
            />
          </svg>

          <span>계정</span>
        </a>
      </div>

      {/* <!-- Product List --> */}
      <section className="py-10 bg-gray-100">
        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {devicePagingDtoList.map((device) => (
            <article
              key={device.id}
              className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
            >
              <a href="#">
                <div className="relative flex items-end overflow-hidden rounded-xl">
                  {device.imageId && (
                    <Image
                      src={`${backendUrl}/image/${device.imageId}`}
                      alt={`${device.imageId}`}
                      width={240}
                      height={240}
                      className="w-auto h-auto"
                    />
                  )}
                  <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-slate-400">4.9</span>
                  </div>
                </div>

                <div className="mt-1 p-2">
                  <h2 className="text-slate-700">{device.name}</h2>
                  {device.evaluationItemList.map((item) => (
                    <span
                      key={`${device.id + item}`}
                      className="mt-1 text-sm text-slate-400"
                    >
                      {`${item} `}
                    </span>
                  ))}

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">
                      {device.categoryName}
                    </p>

                    <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                      <button className="text-sm">자세히보기</button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-blue-500">
                    등록일: {formatDate(device.createdTime)}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
      <div className="my-8">
        <PaginationComponent
          url={url}
          size={size}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      </div>
    </main>
  );
};
export default HomePage;
