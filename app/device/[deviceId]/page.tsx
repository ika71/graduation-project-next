import DeviceBoardClient from "@/components/DeviceBoardClient";
import DeviceDetailClient from "@/components/DeviceDetailClient";
import RelationDeviceComponent from "@/components/RelationDeviceComponent";
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
  relationDeviceCount: number;
}
interface EvalItemAvg {
  id: number;
  name: string;
  avg: number | null;
}

interface FetchRelationDevice {
  deviceList: RelationDevice[];
}

interface RelationDevice {
  id: number;
  name: string;
  categoryName: string;
  imageId: string | null;
  createdTime: string;
  evaluationItemList: string[];
  totalAvg: number | null;
  boardCount: number;
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

  const relationDeviceCount = deviceDetail.relationDeviceCount;
  const relationDevicePagingSize = 4;
  const max = Math.ceil(relationDeviceCount / relationDevicePagingSize);

  const random = Math.floor(Math.random() * max) + 1;

  const relationDeviceResponse = await fetch(
    `${backendUrl}/device?page=${random}&size=${relationDevicePagingSize}&categoryCondition=${deviceDetail.categoryName}`
  );

  const fetchRelationDevice: FetchRelationDevice =
    await relationDeviceResponse.json();
  const relationDeviceList = fetchRelationDevice.deviceList.filter(
    (relationDevice) => relationDevice.id != deviceId
  );
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
      <RelationDeviceComponent relationDeviceList={relationDeviceList} />
    </>
  );
};
export default DeviceDetailPage;
