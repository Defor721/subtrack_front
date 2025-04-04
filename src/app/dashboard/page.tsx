// app/dashboard/page.tsx
"use client";

export default function DashboardPage() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">대시보드</h1>
      <p className="mb-6">환영합니다! 구독 서비스를 사용해보세요.</p>
      <a
        href="/subscriptions"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        내 구독 확인하기
      </a>
      <br />
      <a
        href="/plans"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        요금제 선택하러 가기
      </a>
    </main>
  );
}
