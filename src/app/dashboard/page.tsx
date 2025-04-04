"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl text-center"
      >
        <h1 className="text-3xl font-bold mb-4">SubTrack</h1>
        <p className="mb-8 text-gray-300">
          환영합니다! 구독 서비스를 사용해보세요.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/subscriptions"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            내 구독 확인하기
          </Link>
          <Link
            href="/plans"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            요금제 선택하러 가기
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
