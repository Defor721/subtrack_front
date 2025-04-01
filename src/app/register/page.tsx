"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "https://subtrackapi-production.up.railway.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("회원가입 성공! 이제 로그인하세요.");
      } else {
        alert("회원가입 실패");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
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
        onClick={handleRegister}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        회원가입
      </button>
    </main>
  );
}
