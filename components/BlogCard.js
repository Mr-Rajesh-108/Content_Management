// components/BlogCard.js
import Link from 'next/link';

const BlogCard = ({ title, date, link,  }) => {
  return (
    <div className="transform transition-transform duration-300 hover:scale-105 bg-white shadow-md rounded-lg p-6 m-4">
      <Link href={link}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">published on {date}</p>
      {/* <p className="text-gray-700 mb-4">{date}</p> */}

        <p className="text-blue-500 hover:underline">Read More</p>
      </Link>
    </div>
  );
};

export default BlogCard;
