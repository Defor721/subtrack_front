"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://subtrackapi-production.up.railway.app/plans")
      .then((res) => res.json())
      .then(setPlans)
      .catch(console.error);
  }, []);

  const handleCheckout = async () => {
    if (!selected) return;
    setLoading(true);

    const res = await fetch(
      "https://subtrackapi-production.up.railway.app/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ planId: selected }),
      }
    );

    const data = await res.json();
    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      alert("결제 페이지로 이동 실패");
      console.error(data);
    }

    setLoading(false);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">요금제 선택</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan: Plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`border rounded p-4 cursor-pointer ${
              selected === plan.id ? "border-blue-500 border-4" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="mb-2 text-sm text-gray-600">{plan.description}</p>
            <p className="text-lg font-bold">${plan.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleCheckout}
        disabled={!selected || loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "결제 준비 중..." : "Stripe 결제"}
      </button>
    </main>
  );
}
