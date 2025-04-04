"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPlanPage() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch(
        `https://subtrackapi-production.up.railway.app/plans/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await res.json();
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
    };

    if (id) fetchPlan();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(
      `https://subtrackapi-production.up.railway.app/plans/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ name, price, description }),
      }
    );

    if (res.ok) {
      alert("요금제 수정 완료");
      router.push("/admin/plans");
    } else {
      const data = await res.json();
      alert(`수정 실패: ${data.message || "에러"}`);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 요금제 수정</h1>

      <input
        type="text"
        placeholder="요금제 이름"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="가격 (달러 단위)"
        className="border p-2 w-full mb-2"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <textarea
        placeholder="설명"
        className="border p-2 w-full mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        저장
      </button>
    </main>
  );
}
