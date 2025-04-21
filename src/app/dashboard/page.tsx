"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Subscription = {
  id: string;
  plan: Plan;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
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
      } catch (err) {
        console.error(err);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleCancel = async () => {
    if (!confirm("정말로 구독을 취소하시겠습니까?")) return;

    try {
      setCancelling(true);
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
        alert("구독이 성공적으로 취소되었습니다.");
        setSubscription(null);
      } else {
        const data = await res.json();
        alert(`구독 취소 실패: ${data.message || "에러"}`);
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">대시보드</h1>

        {subscription ? (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                {subscription.plan.name}
              </h2>
              <p className="text-gray-300">{subscription.plan.description}</p>
              <p className="text-3xl font-bold text-green-400">
                ${subscription.plan.price}
                <span className="text-sm text-gray-400"> / 월</span>
              </p>
              <p className="text-sm text-gray-500">
                구독 시작일:{" "}
                {new Date(subscription.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50 hover:cursor-pointer"
              >
                {cancelling ? "구독 취소 중..." : "구독 취소하기"}
              </button>
              <button
                onClick={() => router.push("/plans")}
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition hover:cursor-pointer"
              >
                다른 요금제 보기
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-xl text-gray-300">
              현재 구독 중인 요금제가 없습니다.
            </p>
            <button
              onClick={() => router.push("/plans")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              요금제 선택하러 가기
            </button>
          </div>
        )}
      </motion.div>
    </main>
  );
}
