import DeviceBoardClient from "@/components/DeviceBoardClient";
import DeviceDetailClient from "@/components/DeviceDetailClient";
import DeviceDetailChart from "@/components/chart/DeviceDetailChart";
import { backendUrl } from "@/url/backendUrl";
import { notFound } from "next/navigation";

interface DeviceDetail {
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

const DeviceDetailPage = async ({
  params,
  searchParams,
}: {
  params: { deviceId: number };
  searchParams: { boardPage: number };
}) => {
  const deviceId = params.deviceId;
  const currentPage = searchParams.boardPage || 1;

  const size = 10;

  const deviceBoardResponse = await fetch(
    `${backendUrl}/board?page=${currentPage}&size=${size}&deviceId=${deviceId}`,
    { cache: "no-store" }
  );
  if (!deviceBoardResponse.ok) {
    return notFound();
  }

  const fetchData = await deviceBoardResponse.json();

  const deviceDetailResponse = await fetch(`${backendUrl}/device/${deviceId}`, {
    next: { revalidate: 1 },
  });
  if (!deviceDetailResponse.ok) {
    return notFound();
  }
  const deviceDetail: DeviceDetail = await deviceDetailResponse.json();

  return (
    <>
      <DeviceDetailClient deviceDetail={deviceDetail} />
      <div className="md:w-3/5 mx-auto">
        <DeviceDetailChart evalItemAvgList={deviceDetail.evalItemAvgList} />
      </div>
      <hr className="h-1 bg-blue-300 my-3" />
      <DeviceBoardClient
        currentPage={currentPage}
        deviceId={deviceId}
        fetchData={fetchData}
      />
    </>
  );
};
export default DeviceDetailPage;
