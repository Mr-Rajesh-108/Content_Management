import connectToDatabase from "../../lib/mongoose";
import Blogs from "../../models/Blogs";
import BlogCard from "@/components/BlogCard";
import formatedDate from "@/lib/formatedDate";

export default function BlogIndexPage({ posts }) {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          // console.log(),
          <BlogCard
            key={post._id}
            title={post.title}
            date={`${post.createdAt.formattedDate}`}
            link={`blog/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await connectToDatabase();

  const posts = await Blogs.find({}).sort({ createdAt: -1 }).lean();

  // posts.forEach((post) => ({
  // post.createdAt = formatedDate(post.createdAt);
  // post._id = post._id.toString();
  // }));
  const blogData = posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: formatedDate(post.createdAt),
    updatedAt: formatedDate(post.updatedAt),
  }));

  // console.log(blogData);
  return {
    props: {
      posts: blogData,
    },
  };
}
