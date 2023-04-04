import PostCard from "./postCard";

export default async function Posts({ posts, user }) {
  return (
    <div className="w-full col-span-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
}
