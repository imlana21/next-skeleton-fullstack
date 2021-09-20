import jwtVerify from 'middlewares/auth/jwt-verify';
import db from '~database/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const verify = await jwtVerify(req, res);

  const { id } = req.query;

  const deleteRow = await db('posts').where({ id }).del();

  res.status(200);
  res.json({
    message: 'Delete Success',
    verify,
    status: deleteRow
  });
}