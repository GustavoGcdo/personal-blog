export type User = {
  name: string
  picture: string
  sub: string
  email?: string
}

export type Comment = {
  id: string
  created_at: number
  url: string
  text: string
  user: User
}

export type Post = {
  slug: string;
  title: string;
  description: string;
  formatedDate: string;
  publishedAt: string;
  content: string;
  image: string;
};