"use client";

export default function TestPaymentPage() {
  const handleCheckout = async () => {
    const res = await fetch(
      "https://subtrackapi-production.up.railway.app/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          planId: "pro", // 👈 Stripe 대시보드에서 실제 planId 넣어줘야 해
        }),
      }
    );

    const data = await res.json();
    if (res.ok && data.url) {
      window.location.href = data.url; // ✅ Stripe 결제 페이지로 리디렉션
    } else {
      alert("Checkout 실패");
      console.error(data);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">결제 테스트</h1>
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Stripe Checkout 열기
      </button>
    </main>
  );
}
