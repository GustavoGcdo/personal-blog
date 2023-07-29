import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Comment } from '../../interfaces';
import clearUrl from '../clearUrl';
import getUser from '../getUser';
import redis from '../redis';

export default async function createComments(req: NextApiRequest, res: NextApiResponse) {
  
  const url = clearUrl(req.headers.referer || '');
  const { text } = req.body;
  const { authorization } = req.headers;
  
  console.log(url, text, authorization);
  
  if (!text || !authorization || !url) {
    return res.status(400).json({ message: 'Missing parameter.' });
  }
  
  if (!redis) {
    return res.status(400).json({ message: 'Failed to connect to redis client.' });
  }

  console.log('aquiiii');

  try {
    // verify user token
    const user = await getUser(authorization);
    if (!user) return res.status(400).json({ message: 'Need authorization.' });

    const { name, picture, sub, email } = user;

    const comment: Comment = {
      id: nanoid(),
      created_at: Date.now(),
      url,
      text,
      user: { name, picture, sub, email },
    };

    // write data
    await redis.lpush(url, JSON.stringify(comment));

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    
    return res.status(400).json({ message: 'Unexpected error occurred.' });
  }
}
