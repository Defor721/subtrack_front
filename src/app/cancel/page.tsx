"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 4000); // 4초 후 이동

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl text-center"
      >
        <h1 className="text-3xl font-bold mb-4">❌ 결제 실패</h1>
        <p className="text-gray-300">
          결제가 취소되었거나 실패했습니다.
          <br />
          잠시 후 대시보드로 돌아갑니다...
        </p>
      </motion.div>
    </main>
  );
}
