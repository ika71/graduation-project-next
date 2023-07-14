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
    <div>
      <h1>{deviceDetail.name}</h1>
      <h1>{deviceDetail.categoryName}</h1>
      <div>
        {deviceDetail.imageId && (
          <Image
            src={`${backendUrl}/image/${deviceDetail.imageId}`}
            alt={`${deviceDetail.imageId}`}
            width={240}
            height={240}
            className="w-auto h-auto"
          />
        )}
      </div>
      <h1>{formatDate(deviceDetail.createdTime)}</h1>
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
