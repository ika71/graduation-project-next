"use client";

import { useContext, useState } from "react";
import EvaluationPutModal from "./modal/evaluation/EvaluationPutModal";
import UserContext from "@/context/userContext";
import Image from "next/image";
import { backendUrl } from "@/url/backendUrl";

interface Props {
  deviceDetail: DeviceDetail;
}

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

/**
 * @param deviceDetail: 전자제품 정보
 * @returns
 */
const DeviceDetailClient = (props: Props) => {
  const { deviceDetail } = props;
  const deviceId = deviceDetail.id;

  const [evaluationPutModalShow, setEvaluationPutModal] = useState(false);
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <></>;
  }
  const { isLogin } = userContext;
  const openPutModal = () => {
    setEvaluationPutModal(true);
  };
  const closePutModal = () => {
    setEvaluationPutModal(false);
  };
  const afterPut = () => {
    closePutModal();
  };

  return (
    <>
      {evaluationPutModalShow && (
        <EvaluationPutModal
          deviceId={deviceId}
          closeModal={closePutModal}
          afterPut={afterPut}
        />
      )}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 m-5">
        <div className="text-center">
          {deviceDetail.imageId && (
            <Image
              src={`${backendUrl}/image/${deviceDetail.imageId}`}
              alt={`${deviceDetail.imageId}`}
              width={240}
              height={240}
              className="w-full max-w-sm mx-auto"
            />
          )}
          <h3 className="text-xl font-medium text-gray-900">
            {deviceDetail.name}
          </h3>
          <p className="mt-1 text-gray-500">{deviceDetail.categoryName}</p>
          <p className="mb-1 text-sm text-primary-500">
            등록 날짜 <time>{deviceDetail.createdTime}</time>
          </p>
        </div>

        <div>
          {isLogin && (
            <button
              onClick={openPutModal}
              className="mx-2 my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
            >
              평가하기
            </button>
          )}
          <table className="min-w-full border-collapse table">
            <tbody className="table-row-group">
              {deviceDetail.evalItemAvgList.map((evalItemAvg, index) => (
                <tr
                  key={evalItemAvg.id}
                  className={
                    "border border-grey-500 table-row " +
                    (index % 2 === 0 ? "bg-gray-300" : "bg-white")
                  }
                >
                  <td className="p-2 text-left border-r-2 border-gray-400">
                    <h1>{evalItemAvg.name}</h1>
                  </td>
                  <td className="p-2 text-left">
                    <h1>{evalItemAvg.avg || "평점 없음"}</h1>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default DeviceDetailClient;
