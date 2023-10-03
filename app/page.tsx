import PaginationComponent from "@/components/PaginationComponent";
import { apiUrl, backendUrl } from "@/url/backendUrl";
import Image from "next/image";
import Link from "next/link";

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
                  {device.imageId && (
                    <Image
                      src={`${backendUrl}/image/${device.imageId}`}
                      alt={device.imageId}
                      width={300}
                      height={300}
                      className="rounded-t h-72 w-full"
                    />
                  )}
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
