// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '~database/db';

export default function handler(req, res) {
  if(req.method !== 'POST') return res.status(500).end();

  const createData = await db('post').insert({
    title,
    content
  });

  res.json({
    message: 'POST Success',
    data: createData
  });
}
