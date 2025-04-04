"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPlanPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://subtrackapi-production.up.railway.app/plans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ name, price, description }),
        }
      );

      if (res.ok) {
        alert("요금제 등록 완료");
        router.push("/admin/plans");
      } else {
        const data = await res.json();
        alert(`등록 실패: ${data.message || "알 수 없는 오류"}`);
      }
    } catch (err) {
      alert("에러 발생");
      console.error(err);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ 새 요금제 만들기</h1>

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
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        요금제 등록
      </button>
    </main>
  );
}
