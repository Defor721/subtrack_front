"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
          <button
            onClick={() => router.push("/plans")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            다른 요금제 보기
          </button>
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
