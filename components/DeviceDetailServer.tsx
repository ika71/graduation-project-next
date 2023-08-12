import { backendUrl } from "@/url/backendUrl";
import Image from "next/image";

interface Props {
  deviceId: number;
}

interface FetchData {
  id: number;
  name: string;
  categoryName: string;
  imageId: number | null;
  createdTime: string;
  evalItemAvgList: EvalItemAvg[];
}
interface EvalItemAvg {
  id: number;
  name: string;
  avg: number | null;
}
/**
 * @param deviceId: 정보를 볼 전자제품의 id
 * @returns
 */
const DeviceDetailServer = async (props: Props) => {
  const deviceId = props.deviceId;

  const res = await fetch(`${backendUrl}/device/${deviceId}`, {
    next: { revalidate: 1 },
  });
  const deviceDetail: FetchData = await res.json();

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
          등록 날짜 <time>{deviceDetail.createdTime}</time>
        </p>
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
          {deviceDetail.evalItemAvgList.map((evalItemAvg) => (
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

export default DeviceDetailServer;
