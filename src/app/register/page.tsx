"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; // Feather Icons

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setError("");

    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://subtrackapi-production.up.railway.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("회원가입 성공! 이제 로그인하세요.");
        router.push("/login");
      } else {
        setError(data.message || "회원가입 실패");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">회원가입</h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          SubTrack에 오신 걸 환영합니다! <br />
          빠르고 간편하게 구독을 관리해보세요.
        </p>

        <div className="flex flex-col gap-4">
          {/* 이메일 */}
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="이메일"
              className="pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="pl-10 pr-20 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3.5 text-blue-300 hover:text-blue-400 hover:cursor-pointer"
            >
              {showPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* 버튼 */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-4 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg flex justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "회원가입"
            )}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
