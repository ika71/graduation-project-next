import DeviceBoardClient from "@/components/DeviceBoardClient";
import DeviceDetailClient from "@/components/DeviceDetailClient";
import { backendUrl } from "@/url/backendUrl";

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

  const fetchData = await deviceBoardResponse.json();

  const deviceDetailResponse = await fetch(`${backendUrl}/device/${deviceId}`, {
    next: { revalidate: 1 },
  });
  const deviceDetail = await deviceDetailResponse.json();

  return (
    <>
      <DeviceDetailClient deviceDetail={deviceDetail} />
      <DeviceBoardClient
        currentPage={currentPage}
        deviceId={deviceId}
        fetchData={fetchData}
      />
    </>
  );
};
export default DeviceDetailPage;
