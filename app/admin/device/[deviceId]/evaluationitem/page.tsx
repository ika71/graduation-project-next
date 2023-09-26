"use client";

import EvaluationItemAddModal from "@/components/modal/evaluationItem/EvaluationItemAddModal";
import EvaluationItemEditModal from "@/components/modal/evaluationItem/EvaluationItemEditModal";
import UserContext from "@/context/userContext";
import { backendUrl } from "@/url/backendUrl";
import { useContext, useEffect, useState } from "react";

interface EvaluationItem {
  id: number;
  name: string;
}

interface FetchData {
  evaluationItemList: EvaluationItem[];
}

const EvaluationitemPage = ({ params }: { params: { deviceId: number } }) => {
  const deviceId = params.deviceId;
  const userContext = useContext(UserContext);
  const [evaluationItemList, setEvaluationItemList] =
    useState<EvaluationItem[]>();

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editEvalItemId, setEditEvalItemId] = useState<number>();
  const [prevName, setPrevName] = useState("");

  /**
   * 평가항목 요청
   */
  const fetchData = async () => {
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/admin/evaluationitem?deviceId=${deviceId}`,
      "GET"
    );
    const fetchData: FetchData = await res.json();
    setEvaluationItemList(fetchData.evaluationItemList);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  if (!evaluationItemList) {
    return <div>로딩 중</div>;
  }

  const openAddModal = () => {
    setAddModalShow(true);
  };
  const closeAddModal = () => {
    setAddModalShow(false);
  };
  const afterAdd = () => {
    closeAddModal();
    fetchData();
  };

  const openEditModal = (editEvalItemId: number, prevName: string) => {
    setEditEvalItemId(editEvalItemId);
    setPrevName(prevName);
    setEditModalShow(true);
  };
  const closeEditModal = () => {
    setEditModalShow(false);
  };
  const afterEdit = () => {
    setEditModalShow(false);
    fetchData();
  };

  const deleteEvaluationItem = async (id: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    if (!userContext) {
      return;
    }
    const res = await userContext.authRequest(
      `${backendUrl}/admin/evaluationitem/${id}`,
      "DELETE"
    );
    if (res.ok) {
      fetchData();
    } else {
      const resText = await res.text();
      resText ? alert(resText) : alert("평가항목 식제에 실패하였습니다.");
    }
  };

  return (
    <div className="md:w-2/3 md:mx-auto text-center md:text-left">
      {addModalShow && (
        <EvaluationItemAddModal
          deviceId={deviceId}
          closeModal={closeAddModal}
          afterAdd={afterAdd}
        />
      )}
      {editModalShow && editEvalItemId && (
        <EvaluationItemEditModal
          evaluationItemId={editEvalItemId}
          prevName={prevName}
          closeModal={closeEditModal}
          afterEdit={afterEdit}
        />
      )}
      <button
        onClick={openAddModal}
        className="w-4/5 md:w-fit mx-auto md:mx-0 my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
      >
        평가항목 추가
      </button>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {evaluationItemList.map((evaluationItem, index) => (
            <tr
              key={evaluationItem.id}
              className={
                "border border-grey-500 md:border-none block md:table-row " +
                (index % 2 === 0 ? "bg-gray-300" : "bg-white")
              }
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block font-bold md:font-normal">
                  {evaluationItem.name}
                </span>
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <button
                  onClick={() =>
                    openEditModal(evaluationItem.id, evaluationItem.name)
                  }
                  className="w-full md:w-fit my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvaluationItem(evaluationItem.id)}
                  className="w-full md:w-fit my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationitemPage;
