"use client";

import { useEffect, useState } from "react";
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
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">내 구독 정보</h1>

      {subscription ? (
        <div className="border rounded p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold">{subscription.plan.name}</h2>
          <p className="text-gray-600">{subscription.plan.description}</p>
          <p className="font-bold mt-2">${subscription.plan.price}</p>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {loading ? "처리 중..." : "구독 취소하기"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500">
          현재 구독 중인 요금제가 없습니다. <br />
          <a href="/plans" className="text-blue-600 hover:underline">
            요금제 선택하러 가기 →
          </a>
        </p>
      )}
    </main>
  );
}
