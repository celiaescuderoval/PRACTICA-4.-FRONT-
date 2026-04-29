"use client";

import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function PostCard({ post }: any) {
  const router = useRouter();

  return (
    <div
      className="post"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer"
      }}
    >
      <div onClick={() => router.push("/post/" + post._id)}>
        <p>{post.contenido}</p>

        <p>
          Autor: {post.autor ? post.autor.username : "Sin autor"}
        </p>

        <p>
          Likes: {post.likes ? post.likes.length : 0} | Retweets:{" "}
          {post.retweets ? post.retweets.length : 0}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          
          api.post("/api/posts/" + post._id + "/like")
            .then(() => window.location.reload())
            .catch((err) => console.log(err.response?.data));
        }}
      >
        Like
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();

          api.post("/api/posts/" + post._id + "/retweet")
            .then(() => window.location.reload())
            .catch((err) => console.log(err.response?.data));
        }}
      >
        Retweet
      </button>
    </div>
  );
}