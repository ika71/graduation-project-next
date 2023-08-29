"use client";

import { PropsWithChildren, useContext, useState } from "react";
import EvaluationPutModal from "./modal/evaluation/EvaluationPutModal";
import UserContext from "@/context/userContext";

interface Props {
  deviceId: number;
}
/**
 * @param deviceId: 정보를 볼 전자제품의 id
 * @returns
 */
const DeviceDetailClient = ({
  deviceId,
  children,
}: PropsWithChildren<Props>) => {
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
    <div>
      {evaluationPutModalShow && (
        <EvaluationPutModal
          deviceId={deviceId}
          closeModal={closePutModal}
          afterPut={afterPut}
        />
      )}
      {children}
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
        {isLogin && (
          <button
            onClick={openPutModal}
            className="mx-2 my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
          >
            평가하기
          </button>
        )}
      </div>
    </div>
  );
};
export default DeviceDetailClient;
