"use client";

import { authReqeustWithOutBody } from "@/auth/LoginService";
import { backendUrl } from "@/url/backendUrl";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EvaluationItem {
  id: number;
  name: string;
}

interface FetchData {
  evaluationItemList: EvaluationItem[];
}

const EvaluationitemPage = ({ params }: { params: { id: number } }) => {
  const deviceId = params.id;
  const [evaluationItemList, setEvaluationItemList] =
    useState<EvaluationItem[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await authReqeustWithOutBody(
        `${backendUrl}/admin/evaluationitem?deviceId=${deviceId}`,
        "GET"
      );
      const fetchData: FetchData = await res.json();
      setEvaluationItemList(fetchData.evaluationItemList);
    };

    fetch();
  }, [deviceId]);

  if (evaluationItemList === undefined) {
    return <div>로딩 중</div>;
  }

  return (
    <div>
      <Link href={`/admin/evaluationitem/add/${deviceId}`}>
        <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
          평가항목 추가
        </button>
      </Link>
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-3">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">
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
