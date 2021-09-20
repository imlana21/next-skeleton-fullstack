import jwtVerify from 'middlewares/auth/jwt-verify';
import db from '~database/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).end();

  const verify = await jwtVerify(req, res);

  const { id } = req.query;
  const { title, content } = req.body;

  const update = await db('posts')
                        .where({ id })
                        .update({
                          title,
                          content
                        });
  
  const updatedData = await db('posts').where({ id });

  res.status(200);
  res.json({
    message: 'Get Data Success',
    status: update,
    verify,
    data: updatedData
  })
}