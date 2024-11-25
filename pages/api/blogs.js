import connectToDatabase from '../../lib/mongoose';
import Blogs from '../../models/Blogs';

export default async function handler(req, res) {
  const { method } = req;
  await connectToDatabase();
  switch (method) {
    case 'GET':
      try {
        const blogs = await Blogs.find({});
        res.status(200).json({ data: blogs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const blogs = await Blogs.create(req.body);
        res.status(201).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }

}
