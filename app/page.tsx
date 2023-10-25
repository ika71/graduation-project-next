import PaginationComponent from "@/components/PaginationComponent";
import { backendUrl } from "@/url/backendUrl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface FetchData {
  deviceList: Device[];
  totalCount: number;
}

interface Device {
  id: number;
  name: string;
  categoryName: string;
  imageId: string | null;
  createdTime: string;
  evaluationItemList: string[];
  totalAvg: number;
}

const HomePage = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    deviceName?: string;
    categoryName?: string;
  };
}) => {
  const { page = 1, deviceName, categoryName } = searchParams;
  const size = 8;

  let fetchUrl = `${backendUrl}/device?page=${page}&size=${size}`;
  let currentUrl = "?";
  if (deviceName) {
    fetchUrl += `&nameCondition=${deviceName}`;
    currentUrl += `deviceName=${deviceName}`;
  }
  if (categoryName) {
    fetchUrl += `&categoryCondition=${categoryName}`;
    currentUrl += `categoryName=${categoryName}`;
  }
  const res = await fetch(fetchUrl, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  const fetchData: FetchData = await res.json();
  const deviceList: Device[] = fetchData.deviceList;

  const totalCount = fetchData.totalCount;

  return (
    <main className="py-5 px-10 bg-gray-100">
      <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deviceList.map((device) => (
          <div key={device.id}>
            <Link href={`device/${device.id}`} className="cursor-pointer">
              <div className="my-8 rounded shadow-lg shadow-gray-200 bg-white hover:scale-105 duration-500">
                <div>
                  <div className="relative flex items-end overflow-hidden rounded-xl">
                    {device.imageId && (
                      <Image
                        src={`${backendUrl}/image/${device.imageId}`}
                        alt={device.imageId}
                        width={300}
                        height={300}
                        className="rounded-t h-72 w-full"
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
                      <span className="ml-1 text-sm text-slate-400">
                        {device.totalAvg || "평점 없음"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-lg mb-4 font-bold leading-relaxed text-gray-800">
                      {device.name}
                    </p>
                    <p className="leading-5 text-gray-500">
                      {device.categoryName}
                    </p>
                    {device.evaluationItemList.map((evaluationItem) => (
                      <span
                        key={device.id + evaluationItem}
                        className="leading-5 text-gray-500"
                      >
                        {evaluationItem + " / "}
                      </span>
                    ))}
                    <p className="leading-5 text-gray-500">
                      {"등록일: " + device.createdTime}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <PaginationComponent
        url={`${currentUrl}&page=`}
        size={size}
        currentPage={page}
        totalCount={totalCount}
      />
    </main>
  );
};
export default HomePage;
