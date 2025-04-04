"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Subscription = {
  id: string;
  plan: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
};

export default function MySubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSubscription = async () => {
    const res = await fetch(
      "https://subtrackapi-production.up.railway.app/subscriptions/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      setSubscription(data);
    } else {
      setSubscription(null);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleCancel = async () => {
    if (!confirm("정말로 구독을 취소하시겠습니까?")) return;
    setLoading(true);

    const res = await fetch(
      "https://subtrackapi-production.up.railway.app/subscriptions",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (res.ok) {
      alert("구독이 취소되었습니다.");
      setSubscription(null);
    } else {
      alert("구독 취소에 실패했습니다.");
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8"
      >
        내 구독 정보
      </motion.h1>

      {subscription?.plan ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl text-center"
        >
          <h2 className="text-xl font-semibold mb-2">
            {subscription.plan.name}
          </h2>
          <p className="text-gray-300 mb-2">{subscription.plan.description}</p>
          <p className="text-2xl font-bold mb-4">${subscription.plan.price}</p>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "처리 중..." : "구독 취소하기"}
          </button>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 text-center"
        >
          현재 구독 중인 요금제가 없습니다. <br />
          <a
            href="/plans"
            className="text-blue-500 hover:underline font-medium"
          >
            요금제 선택하러 가기 →
          </a>
        </motion.p>
      )}
    </main>
  );
}
