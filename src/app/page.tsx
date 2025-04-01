"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Subtrack</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          로그인
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
}
