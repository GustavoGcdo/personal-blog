import { NextApiRequest, NextApiResponse } from 'next';
import createComments from '../../lib/comments/createComments';
import deleteComments from '../../lib/comments/deleteComment';
import fetchComment from '../../lib/comments/fetchComments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return fetchComment(req, res);
    case 'POST':
      return createComments(req, res);
    case 'DELETE':
      return deleteComments(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method.' });
  }
}
