import DeviceDetailClient from "@/components/DeviceDetailClient";
import DeviceDetailServer from "@/components/DeviceDetailServer";

const DeviceDetailPage = ({ params }: { params: { deviceId: number } }) => {
  const deviceId = params.deviceId;

  return (
    <DeviceDetailClient>
      <DeviceDetailServer deviceId={deviceId} />
    </DeviceDetailClient>
  );
};
export default DeviceDetailPage;
