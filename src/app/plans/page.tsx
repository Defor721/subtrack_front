"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10"
      >
        요금제 선택
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setSelected(plan.id)}
            className={`p-6 rounded-2xl bg-white/5 backdrop-blur-md border transition-all cursor-pointer shadow-lg ${
              selected === plan.id
                ? "border-blue-500 ring-2 ring-blue-500"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="mb-4 text-sm text-gray-300">{plan.description}</p>
            <p className="text-2xl font-bold">${plan.price}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleCheckout}
          disabled={!selected || loading}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? "결제 준비 중..." : "Stripe 결제"}
        </button>
      </div>
    </main>
  );
}
