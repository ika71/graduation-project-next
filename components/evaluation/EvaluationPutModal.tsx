import { authReqeust, authReqeustWithOutBody } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  deviceId: number;
  closeModal: () => void;
  afterPut: () => void;
}

interface FetchData {
  evaluationFindDtoList: EvaluationFindDto[];
}
interface EvaluationFindDto {
  evalItemId: number;
  evalItemName: string;
  evalScore: number | null;
}

interface EvaluationPutRequestDto {
  evaluationPutDtoList: EvaluationPutDto[];
}

interface EvaluationPutDto {
  evalItemId: number;
  evaluationScore: number;
}

/**
 * 평점 put 기능이 있는 모달
 * @param closeModal:()=>void close버튼을 눌렀을 때 실행될 함수
 * @param afterPut:()=>void put 실행 후 실행될 함수
 * @returns
 */
const EvaluationPutModal = (props: Props) => {
  const deviceId = props.deviceId;
  const closeModal = props.closeModal;
  const afterput = props.afterPut;

  const [evalList, setEvalList] = useState<EvaluationFindDto[]>();
  const scoreOption = [5, 4, 3, 2, 1, "아직 평가 하지 않았습니다."];

  const fetch = async () => {
    const res = await authReqeustWithOutBody(
      `${backendUrl}/evaluation?deviceId=${deviceId}`,
      "GET"
    );
    const fetchData: FetchData = await res.json();
    setEvalList(fetchData.evaluationFindDtoList);
  };

  useEffect(() => {
    fetch();
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
    evaluation: EvaluationFindDto
  ) => {
    if (isNaN(parseInt(event.target.value))) {
      evaluation.evalScore = null;
    }
    evaluation.evalScore = parseInt(event.target.value);
  };

  if (!evalList) {
    return <div>로딩중</div>;
  }
  const put = async () => {
    const evaluationPutDtoList: EvaluationPutDto[] = [];
    evalList.map((evaluation) => {
      if (evaluation.evalScore) {
        evaluationPutDtoList.push({
          evalItemId: evaluation.evalItemId,
          evaluationScore: evaluation.evalScore,
        });
      }
    });
    const evaluationPutRequestDto: EvaluationPutRequestDto = {
      evaluationPutDtoList: evaluationPutDtoList,
    };
    const res = await authReqeust(
      `${backendUrl}/evaluation`,
      "PUT",
      evaluationPutRequestDto
    );
    if (res) {
      afterput();
    } else {
      alert("평가 저장에 실패하였습니다.");
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                {evalList.map((evaluation) => (
                  <div key={evaluation.evalItemId}>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      {evaluation.evalItemName}
                    </label>
                    <div className="mt-1 mb-5">
                      <select
                        onChange={(event) => selectChange(event, evaluation)}
                        defaultValue={
                          evaluation.evalScore || "아직 평가 하지 않았습니다."
                        }
                        className="border-2 border-black"
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
                <button
                  onClick={put}
                  type="button"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">평가</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={closeModal}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPutModal;
