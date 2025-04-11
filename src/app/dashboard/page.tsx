"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBars,
  FaGaugeHigh,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaGear,
  FaHeadset,
} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-['Inter']">
      {/* 상단 네비게이션 */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 px-3 py-3 lg:px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-semibold">Dashboard</span>
            </Link>
          </div>
          <div>
            <Image
              className="w-8 h-8 rounded-full"
              src="https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot..."
              alt="User"
              width={32}
              height={32}
            />
          </div>
        </div>
      </nav>

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="#"
                className="flex items-center p-2 bg-gray-100 rounded-lg"
              >
                <FaGaugeHigh className="w-5 h-5" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/subscriptions"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaCreditCard className="w-5 h-5" />
                <span className="ml-3">Subscriptions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/billing"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaFileInvoiceDollar className="w-5 h-5" />
                <span className="ml-3">Billing</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaGear className="w-5 h-5" />
                <span className="ml-3">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaHeadset className="w-5 h-5" />
                <span className="ml-3">Support</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* 본문 콘텐츠 */}
      <div className="p-4 pt-20 sm:ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl text-center"
        >
          <h1 className="text-3xl font-bold mb-4">SubTrack</h1>
          <p className="mb-8 text-gray-600">
            환영합니다! 구독 서비스를 사용해보세요.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              href="/subscriptions"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow"
            >
              내 구독 확인하기
            </Link>
            <Link
              href="/plans"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow"
            >
              요금제 선택하러 가기
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
