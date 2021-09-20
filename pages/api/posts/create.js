import jwtVerify from 'middlewares/auth/jwt-verify';
import db from '~database/db';

export default async function handler(req, res) {
  if( req.method !== 'POST') return res.status(405).end();

  const verify = await jwtVerify(req, res);

  const { title, content } = req.body;

  const create = await db('posts').insert({
    title,
    content,
  });
  
  const createdData = await db('posts').where('id', create);

  res.status(200);
  res.json({
    message : 'Insert Page',
    verify,
    data: createdData
  });
}