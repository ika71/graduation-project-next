import { backendUrl } from "@/url/backendUrl";
import Image from "next/image";

interface FetchData {
  id: number;
  name: string;
  categoryName: string;
  imageId: number | null;
  createdTime: string;
  evalItemAvgDtoList: evalItemAvgDto[];
}
interface evalItemAvgDto {
  id: number;
  name: string;
  avg: number | null;
}

const DeviceDetailPage = async ({
  params,
}: {
  params: { deviceId: number };
}) => {
  const deviceId = params.deviceId;

  const res = await fetch(`${backendUrl}/device/${deviceId}`, {
    cache: "no-store",
  });
  const deviceDetail: FetchData = await res.json();

  const formatDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return year + "-" + month + "-" + day;
  };
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      {deviceDetail.imageId && (
        <Image
          src={`${backendUrl}/image/${deviceDetail.imageId}`}
          alt={`${deviceDetail.imageId}`}
          width={240}
          height={240}
          className="w-auto h-auto"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-900">
          {deviceDetail.name}
        </h3>
        <p className="mt-1 text-gray-500">{deviceDetail.categoryName}</p>
        <p className="mb-1 text-sm text-primary-500">
          등록 날짜 <time>{formatDate(deviceDetail.createdTime)}</time>
        </p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Design
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
            Product
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            Develop
          </span>
          <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
            평가하기
          </button>
        </div>
      </div>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              평가항목 이름
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              평점
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {deviceDetail.evalItemAvgDtoList.map((evalItemAvg) => (
            <tr
              key={evalItemAvg.id}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  평가항목 이름
                </span>
                <h1>{evalItemAvg.name}</h1>
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  평점
                </span>
                <h1>{evalItemAvg.avg || "아직 평점이 없습니다."}</h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceDetailPage;
