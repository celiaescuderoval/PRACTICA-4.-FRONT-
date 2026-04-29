export type Post = {
  _id: string;
  contenido: string;
  createdAt?: string;
  autor?: {
    _id?: string;
    username?: string;
  };
  likes?: string[];
  retweets?: any[];
  comentarios?: any[];
};