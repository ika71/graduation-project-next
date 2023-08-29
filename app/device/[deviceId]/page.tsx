import DeviceBoardClient from "@/components/DeviceBoardClient";
import DeviceDetailClient from "@/components/DeviceDetailClient";
import DeviceDetailServer from "@/components/DeviceDetailServer";
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

  const res = await fetch(
    `${backendUrl}/board?page=${currentPage}&size=${size}&deviceId=${deviceId}`,
    { cache: "no-store" }
  );

  const fetchData = await res.json();

  return (
    <>
      <DeviceDetailClient deviceId={deviceId}>
        <DeviceDetailServer deviceId={deviceId} />
      </DeviceDetailClient>
      <DeviceBoardClient
        currentPage={currentPage}
        deviceId={deviceId}
        fetchData={fetchData}
      />
    </>
  );
};
export default DeviceDetailPage;
