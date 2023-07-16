"use client";

import { authReqeustWithOutBody } from "@/auth/LoginService";
import EvaluationItemAddModal from "@/components/evaluationItem/EvaluationItemAddModal";
import EvaluationItemEditModal from "@/components/evaluationItem/EvaluationItemEditModal";
import { backendUrl } from "@/url/backendUrl";
import { useEffect, useState } from "react";

interface EvaluationItem {
  id: number;
  name: string;
}

interface FetchData {
  evaluationItemList: EvaluationItem[];
}

const EvaluationitemPage = ({ params }: { params: { deviceId: number } }) => {
  const deviceId = params.deviceId;
  const [evaluationItemList, setEvaluationItemList] =
    useState<EvaluationItem[]>();

  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editEvalItemId, setEditEvalItemId] = useState(-1);
  const [prevName, setPrevName] = useState("");

  const fetch = async () => {
    const res = await authReqeustWithOutBody(
      `${backendUrl}/admin/evaluationitem?deviceId=${deviceId}`,
      "GET"
    );
    const fetchData: FetchData = await res.json();
    setEvaluationItemList(fetchData.evaluationItemList);
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  if (evaluationItemList === undefined) {
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
    fetch();
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
    fetch();
  };

  const deleteEvaluationItem = async (id: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    const res = await authReqeustWithOutBody(
      `${backendUrl}/admin/evaluationitem/${id}`,
      "DELETE"
    );
    if (res.ok) {
      fetch();
    } else {
      alert("평가항목 삭제에 실패하였습니다.");
    }
  };

  return (
    <div>
      {addModalShow && (
        <EvaluationItemAddModal
          deviceId={deviceId}
          closeModal={closeAddModal}
          afterAdd={afterAdd}
        />
      )}
      {editModalShow && (
        <EvaluationItemEditModal
          evaluationItemId={editEvalItemId}
          prevName={prevName}
          closeModal={closeEditModal}
          afterEdit={afterEdit}
        />
      )}
      <button
        onClick={openAddModal}
        className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
      >
        평가항목 추가
      </button>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Evaluation Item Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {evaluationItemList.map((evaluationItem) => (
            <tr
              key={evaluationItem.id}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Evaluation Item Names
                </span>
                {evaluationItem.name}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <span className="inline-block w-1/3 md:hidden font-bold">
                  Actions
                </span>
                <button
                  onClick={() =>
                    openEditModal(evaluationItem.id, evaluationItem.name)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvaluationItem(evaluationItem.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
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
