import PostCard from "./postCard";

export default async function Posts({ posts, user }) {
  return (
    <div className="w-full col-span-2">
      <PostCard posts={posts} user={user} />
    </div>
  );
}
