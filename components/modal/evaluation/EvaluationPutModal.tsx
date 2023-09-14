"use client";

import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { ChangeEvent, useContext, useEffect, useState } from "react";

interface Props {
  deviceId: number;
  closeModal: () => void;
  afterPut: () => void;
}

interface FetchData {
  evaluationFindList: EvaluationFind[];
}
interface EvaluationFind {
  evalItemId: number;
  evalItemName: string;
  evalScore: number | null;
}

interface EvaluationPutRequest {
  evaluationPutList: EvaluationPut[];
}

interface EvaluationPut {
  evalItemId: number;
  evaluationScore: number;
}

/**
 * 평점 put 기능이 있는 모달
 * @param deviceId: number 평점을 put할 전자제품의 id
 * @param closeModal:()=>void close버튼을 눌렀을 때 실행될 함수
 * @param afterPut:()=>void put 실행 후 실행될 함수
 * @returns
 */
const EvaluationPutModal = (props: Props) => {
  const { deviceId, closeModal, afterPut } = props;
  const userContext = useContext(UserContext);

  const [evalList, setEvalList] = useState<EvaluationFind[]>();
  const scoreOption = [5, 4, 3, 2, 1, "평가 없음"];

  const fetchData = async () => {
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/evaluation?deviceId=${deviceId}`,
      "GET"
    );
    const fetchData: FetchData = await res.json();
    setEvalList(fetchData.evaluationFindList);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * fetch 해온 평가 List에서 값을 변경함
   * 나중에 put 요청에 활용
   * @param event
   * @param evaluation
   */
  const selectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    evaluation: EvaluationFind
  ) => {
    if (isNaN(parseInt(event.target.value))) {
      evaluation.evalScore = null;
    }
    evaluation.evalScore = parseInt(event.target.value);
  };

  if (!evalList) {
    return <></>;
  }
  const put = async () => {
    if (!userContext) {
      return;
    }
    const evaluationPutList: EvaluationPut[] = [];
    evalList.map((evaluation) => {
      if (evaluation.evalScore) {
        evaluationPutList.push({
          evalItemId: evaluation.evalItemId,
          evaluationScore: evaluation.evalScore,
        });
      }
    });
    const evaluationPutRequest: EvaluationPutRequest = {
      evaluationPutList: evaluationPutList,
    };
    const res = await userContext.authRequest(
      `${backendUrl}/evaluation`,
      "PUT",
      evaluationPutRequest
    );
    if (res.ok) {
      afterPut();
    } else {
      alert(await res.text());
    }
  };
  return (
    <div className="fixed z-30 inset-0 flex justify-center items-center overflow-y-auto">
      <div
        id="backdrop"
        onClick={closeModal}
        className="fixed h-screen w-full left-0 top-0 bg-gray-500 opacity-75"
      ></div>

      <div className="absolute top-4 bg-white rounded shadow-lg w-10/12 md:w-1/3 transform">
        <div className="border-b px-4 py-2">
          <h3 className="font-semibold text-lg">평가하기</h3>
        </div>

        <div className="p-3 text-center">
          {evalList.map((evaluation) => (
            <div key={evaluation.evalItemId}>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                {evaluation.evalItemName}
              </label>
              <div className="mt-1 mb-5">
                <select
                  onChange={(event) => selectChange(event, evaluation)}
                  defaultValue={evaluation.evalScore || "평가 없음"}
                  className="border-2 border-black text-center"
                >
                  {scoreOption.map((score) => (
                    <option value={score} key={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-x-5 items-center w-100 border-t p-3">
          <button
            onClick={put}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
          >
            평가 저장
          </button>
          <button
            onClick={closeModal}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPutModal;
