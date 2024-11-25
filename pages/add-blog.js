// pages/add-blog.js
import BlogForm from '@/components/BlogForm';
import { useState } from 'react';

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const addBlogPost = async (blog) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([blog]), // sending an array with one blog post
      });

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([...blogs, ...newBlog.data]);
        alert('Post added...')
      } else {
        console.error('Failed to add blog post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center">Add a New Blog Post</h2>
    <BlogForm onSubmit={addBlogPost} />
       
      </div>
    </div>
    </>
  );
};

export default AddBlog;
