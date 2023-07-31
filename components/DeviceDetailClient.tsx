"use client";

import { PropsWithChildren, useState } from "react";
import EvaluationPutModal from "./evaluation/EvaluationPutModal";

interface Props {
  deviceId: number;
}

const DeviceDetailClient = ({
  deviceId,
  children,
}: PropsWithChildren<Props>) => {
  const [evaluationPutModalShow, setEvaluationPutModal] = useState(false);

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
        <button
          onClick={openPutModal}
          className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
        >
          평가하기
        </button>
      </div>
    </div>
  );
};
export default DeviceDetailClient;