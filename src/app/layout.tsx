// app/layout.tsx
"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <html lang="ko">
      <body className="bg-gray-900 text-white">
        {loading ? <LoadingScreen /> : children}
      </body>
    </html>
  );
}
