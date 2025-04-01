"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
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
        router.push("/dashboard"); // 원하는 페이지로 리디렉션
      } else {
        alert("로그인 실패");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <input
        type="email"
        placeholder="이메일"
        className="border p-2 mb-2 w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        className="border p-2 mb-4 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        로그인
      </button>
    </main>
  );
}
