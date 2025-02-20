import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import connectToDatabase from "@/lib/mongoose";
import Blogs from "@/models/Blogs";
import formatedDate from "@/lib/formatedDate";

export default function BlogReadingPage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gray-100 p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          {post.title}
        </h1>
        <p className="text-center text-gray-600">
          By {post.author || "Anonymous"} • {`${post.createdAt.formattedDate}`} • {`${post.createdAt.time}`}
        </p>
        {/* Optionally add a background image */}
        {post.image && (
          <div className="mt-6 text-center">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className="rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Blog Content */}
        <div className="flex-grow">
          <article className="prose max-w-full text-gray-800">
            {/* Render HTML content from database */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>

        {/* Sidebar for Related Posts or Author Info */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Related Posts</h3>
          {/* Example of Related Posts */}
          <ul>
            {/* Replace with dynamic related posts */}
            <li className="mb-4">
              <Link href="/blog/related-post-1">
                <p className="text-blue-600 hover:underline">Related Post 1</p>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/blog/related-post-2">
                <p className="text-blue-600 hover:underline">Related Post 2</p>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

// Fetch blog data from the database using slug
export async function getServerSideProps({ params }) {
  await connectToDatabase();

  const post = await Blogs.findOne({ slug: params.slug }).lean();

  post._id = post._id.toString();
  post.createdAt = formatedDate(post.createdAt);
  post.updatedAt = formatedDate(post.updatedAt);
  return {
    props: {
      post,
    },
  };
}
