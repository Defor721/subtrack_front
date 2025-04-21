"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">대시보드</h1>

      {subscription ? (
        <div className="w-full space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {subscription.plan.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {subscription.plan.description}
            </p>
            <p className="text-3xl font-bold text-green-600 mb-4">
              ${subscription.plan.price}
              <span className="text-sm text-gray-500"> /월</span>
            </p>
            <p className="text-sm text-gray-400">
              구독 시작일:{" "}
              {new Date(subscription.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
            >
              {cancelling ? "구독 취소 중..." : "구독 취소하기"}
            </button>
            <button
              onClick={() => router.push("/plans")}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded transition"
            >
              요금제 변경하기
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <p className="text-xl text-gray-600">
            현재 구독 중인 요금제가 없습니다.
          </p>
          <button
            onClick={() => router.push("/plans")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            요금제 선택하러 가기
          </button>
        </div>
      )}
    </main>
  );
}
