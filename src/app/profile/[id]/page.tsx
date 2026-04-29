"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/api";
import PostCard from "@/components/PostCard";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState<any>(null);
  const [postsUsuario, setPostsUsuario] = useState<any[]>([]);

  useEffect(() => {
    api.get("/api/users/me")
      .then((res) => {
        const usuario = res.data.user || res.data;
        setUser(usuario);

        api.get("/api/home?page=1")
          .then((respuestaPosts) => {
            const todosPosts =
              respuestaPosts.data.data ||
              respuestaPosts.data.posts ||
              respuestaPosts.data;

            const filtrados = todosPosts.filter((post: any) => {
              return post.autor?.username === usuario.username;
            });

            setPostsUsuario(filtrados);
          });
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, []);

  if (!user) return <main>Cargando...</main>;

  return (
    <main>
      <h1>Perfil</h1>

      <div className="caja">
        <p>Usuario: {user.username || user.nombre || user.email || "Sin nombre"}</p>
        <p>Bio: {user.bio || "Sin bio"}</p>
        <p>Seguidores: {user.followersCount || user.followers?.length || 0}</p>
        <p>Siguiendo: {user.followingCount || user.following?.length || 0}</p>
      </div>

      <h2>Posts del usuario</h2>

      {postsUsuario.length === 0 && <p>No hay posts de este usuario</p>}

      {postsUsuario.map((post, index) => (
        <PostCard key={post._id || index} post={post} />
      ))}
    </main>
  );
}