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
        setSubscription(null); // 구독 상태 초기화
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
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>로딩 중...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">🎉 대시보드</h1>

      {subscription ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">구독 중인 요금제</h2>
          <div className="border p-4 rounded shadow-md">
            <p className="text-xl font-bold">{subscription.plan.name}</p>
            <p className="text-gray-600">{subscription.plan.description}</p>
            <p className="text-green-600 font-semibold mt-2">
              💵 {subscription.plan.price} USD / 월
            </p>
            <p className="text-xs text-gray-400 mt-2">
              구독 시작일:{" "}
              {new Date(subscription.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {cancelling ? "취소 중..." : "구독 취소하기"}
            </button>
            <button
              onClick={() => router.push("/plans")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              다른 요금제 보기
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg">현재 구독 중인 요금제가 없습니다.</p>
          <button
            onClick={() => router.push("/plans")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            요금제 선택하러 가기
          </button>
        </div>
      )}
    </main>
  );
}
