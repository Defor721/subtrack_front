export default function CancelPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">결제 취소됨 😢</h1>
      <p className="text-lg mb-6">
        결제가 취소되었거나 오류가 발생했습니다. 다시 시도해주세요.
      </p>
      <a
        href="/plans"
        className="text-blue-600 hover:underline font-medium  cursor-pointer"
      >
        요금제 다시 선택하기
      </a>
    </main>
  );
}
