"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!email.includes("@")) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://subtrackapi-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem("access_token", data.accessToken);
        alert("로그인 성공!");
        router.push("/dashboard");
      } else {
        setError(data.message || "로그인 실패");
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
        <h1 className="text-3xl font-bold mb-4 text-center">로그인</h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          다시 오신 걸 환영합니다! <br />
          이메일과 비밀번호를 입력해 주세요.
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
            onClick={handleLogin}
            disabled={loading}
            className="mt-4 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg flex justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "로그인"
            )}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
