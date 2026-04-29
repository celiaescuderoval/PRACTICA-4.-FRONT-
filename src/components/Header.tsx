"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div className="header">
      <button onClick={() => router.push("/")}>Home</button>

      <button onClick={() => router.push("/profile/me")}>
        Mi perfil
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
      >
        Salir
      </button>
    </div>
  );
}