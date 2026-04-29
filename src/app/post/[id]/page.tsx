"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/api";

export default function PostPage() {
  const params = useParams();
  const id = params.id;

  const [post, setPost] = useState<any>(null);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    api.get("/api/posts/" + id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, []);

  if (post === null) {
    return <main>Cargando...</main>;
  }

  return (
    <main>
      <h1>Detalle del post</h1>

      <div className="post">
        <p>{post.contenido}</p>

        <p>
          Autor: {post.autor ? post.autor.username : "Sin autor"}
        </p>

        <p>Fecha: {post.createdAt}</p>

        <button
          onClick={() => {
            api.post("/api/posts/" + id + "/like")
              .then(() => {
                api.get("/api/posts/" + id)
                  .then((res) => setPost(res.data));
              });
          }}
        >
          Like
        </button>

        <button
          onClick={() => {
            api.post("/api/posts/" + id + "/retweet")
              .then(() => {
                api.get("/api/posts/" + id)
                  .then((res) => setPost(res.data));
              });
          }}
        >
          Retweet
        </button>
      </div>

      <h2>Comentarios</h2>

      {(post.comentarios || []).map((c: any, index: number) => (
        <div className="post" key={c._id || index}>
          <p>{c.contenido}</p>

          <p>
            Autor: {c.autor ? c.autor.username : "Sin autor"}
          </p>
        </div>
      ))}

      <input
        placeholder="Escribe un comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <button
        onClick={() => {
          if (comentario.trim() === "") {
            alert("Escribe algo");
            return;
          }

          api.post("/api/posts/" + id + "/comment", {
            contenido: comentario,
          })
          .then(() => {
            setComentario("");

            api.get("/api/posts/" + id)
              .then((res) => setPost(res.data));
          });
        }}
      >
        Comentar
      </button>
    </main>
  );
}