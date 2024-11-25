import connectToDatabase from '../../lib/mongoose';
import Blogs from '../../models/Blogs';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const posts = req.body;

    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ message: 'An array of posts is required' });
    }
    for (const post of posts) {
      if (!post.title || !post.content || !post.slug || !post.author) {
        return res.status(400).json({ message: 'Invalide input, some fields are required' });
      }
    }
    try {
      const result = await Blogs.insertMany(posts);
          res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create posts', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
