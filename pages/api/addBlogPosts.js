// import connectToDatabase from "@/lib/mongoose";
// import Blog from "@/models/Blogs";

// export default async function handler(req, res) {
//   const { method } = req;

//   await connectToDatabase();
  
//   switch (method) {
//     case 'POST':
//       try {
//         const blogs = req.body; // expecting an array of blog posts
//         if (!Array.isArray(blogs) || blogs.length === 0) {
//           return res.status(400).json({ message: 'An array of posts is required' });
//         }
//         const createdBlogs = await Blog.insertMany(blogs);
//         res.status(201).json({ success: true, data: createdBlogs });
//       } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//       }
//       break;
//     default:
//       res.status(405).json({ success: false, error: 'Method not allowed' });
//       break;
//   }
// }


// pages/api/blogposts.js
import connectToDatabase from '../../lib/mongoose';
import BlogPost from '../../models/Blogs';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const posts  = req.body;

    // console.log(posts);
    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ message: 'An array of posts is required' });
    }

    // Check if all posts have the required fields
    for (const post of posts) {
      if (!post.title || !post.content) {
        return res.status(400).json({ message: 'Each post must have a title and content' });
      }
    }

    try {
      const result = await BlogPost.insertMany(posts
        // posts.map(post => ({
        //   title: post.title,
        //   content: post.content,
        //   author:post.author,
        //   createdAt: new Date(),
        // }))
      );

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create posts', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
