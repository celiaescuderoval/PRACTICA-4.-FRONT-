"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function LoginPage() {
  const router = useRouter();

  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <main>
      <h1>{modo === "login" ? "Login" : "Registro"}</h1>

      {modo === "register" && (
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {modo === "login" ? (
        <button
          onClick={() => {
            api.post("/api/auth/login", {
              email: email,
              password: password,
            })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              router.push("/");
            })
            .catch((err) => {
              console.log(err.response?.data);
              alert(JSON.stringify(err.response?.data));
            });
          }}
        >
          Entrar
        </button>
      ) : (
        <button
          onClick={() => {
            api.post("/api/auth/register", {
              username: username,
              email: email,
              password: password,
            })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              router.push("/");
            })
            .catch((err) => {
              console.log(err.response?.data);
              alert(JSON.stringify(err.response?.data));
            });
          }}
        >
          Registrarse
        </button>
      )}

      <button
        onClick={() => {
          if (modo === "login") {
            setModo("register");
          } else {
            setModo("login");
          }
        }}
      >
        Cambiar a {modo === "login" ? "registro" : "login"}
      </button>
    </main>
  );
}