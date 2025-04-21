"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        Subtrack
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-10 text-lg text-gray-400 text-center max-w-md"
      >
        당신의 구독 정보를 스마트하게 추적하고 관리하세요.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex gap-6"
      >
        <Link
          href="/login"
          className="px-6 py-3 min-w-[140px] text-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          로그인
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 min-w-[140px] text-center rounded-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          회원가입
        </Link>
      </motion.div>
    </main>
  );
}
