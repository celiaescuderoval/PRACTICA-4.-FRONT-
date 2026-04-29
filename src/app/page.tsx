"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import PostCard from "@/components/PostCard";
import Paginador from "@/components/Paginador";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [pagina, setPagina] = useState(1);
  const [contenido, setContenido] = useState("");
  const router = useRouter();

  const cargarPosts = () => {
    api.get("/api/home?page=" + pagina)
      .then((res) => {
        const datos =
          res.data.data ||
          res.data.posts ||
          res.data;

        setPosts(datos);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    cargarPosts();
  }, [pagina]);

  return (
    <main>
      <h1>Home</h1>

      <div className="caja">
        <input
          placeholder="¿Qué está pasando?"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <button
          onClick={() => {
            if (contenido.trim() === "") {
              alert("Escribe algo");
              return;
            }

            api.post("/api/posts", {
              contenido: contenido,
            })
            .then(() => {
              setContenido("");
              cargarPosts();
            });
          }}
        >
          Publicar
        </button>
      </div>

      <h2>Últimos posts</h2>

      {posts.map((post, index) => (
        <PostCard key={post._id || index} post={post} />
      ))}

      <Paginador pagina={pagina} setPagina={setPagina} />
    </main>
  );
}