import DeviceBoardClient from "@/components/DeviceBoardClient";
import DeviceBoardServer from "@/components/DeviceBoardServer";
import DeviceDetailClient from "@/components/DeviceDetailClient";
import DeviceDetailServer from "@/components/DeviceDetailServer";

const DeviceDetailPage = ({
  params,
  searchParams,
}: {
  params: { deviceId: number };
  searchParams: { boardPage: number };
}) => {
  const deviceId = params.deviceId;
  const currentPage = searchParams.boardPage || 1;

  return (
    <>
      <DeviceDetailClient deviceId={deviceId}>
        <DeviceDetailServer deviceId={deviceId} />
      </DeviceDetailClient>
      <DeviceBoardClient deviceId={deviceId}>
        <DeviceBoardServer deviceId={deviceId} currentPage={currentPage} />
      </DeviceBoardClient>
    </>
  );
};
export default DeviceDetailPage;
