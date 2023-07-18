"use client";

import { PropsWithChildren } from "react";

interface Props {
  deviceId: number;
}

const DeviceDetailClient = ({
  deviceId,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div>
      {children}
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
          평가하기
        </button>
      </div>
    </div>
  );
};
export default DeviceDetailClient;
