// app/subscriptions/page.tsx
"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export default function MySubscriptionPage() {
  const [subscription, setSubscription] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchSub = async () => {
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
        setSubscription(data.plan);
      } else {
        setSubscription(null);
      }
    };
    fetchSub();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">내 구독 정보</h1>
      {subscription ? (
        <div className="border rounded p-4 text-center">
          <h2 className="text-xl font-semibold">{subscription.name}</h2>
          <p className="text-gray-600">{subscription.description}</p>
          <p className="font-bold mt-2">${subscription.price}</p>
        </div>
      ) : (
        <p className="text-gray-500">현재 구독 중인 요금제가 없습니다.</p>
      )}
    </main>
  );
}
