"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch(
        "https://subtrackapi-production.up.railway.app/plans",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await res.json();
      setPlans(data);
    };

    fetchPlans();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const res = await fetch(
      `https://subtrackapi-production.up.railway.app/plans/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.ok) {
      alert("삭제 완료");
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    } else {
      alert("삭제 실패");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">📦 요금제 관리</h1>

      <Link
        href="/admin/plans/new"
        className="text-blue-600 underline mb-4 block"
      >
        + 새 요금제 만들기
      </Link>

      <ul>
        {plans.map((plan) => (
          <li key={plan.id} className="border p-4 mb-2">
            <div className="font-bold">{plan.name}</div>
            <div>{plan.description}</div>
            <div>💵 {plan.price} USD</div>
            <div className="mt-2">
              <Link
                href={`/admin/plans/${plan.id}/edit`}
                className="text-blue-600 mr-4 underline"
              >
                수정
              </Link>
              <button
                onClick={() => handleDelete(plan.id)}
                className="text-red-600 underline"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
