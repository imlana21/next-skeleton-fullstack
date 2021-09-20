import db from '~database/db';
import jwtVerify from 'middlewares/auth/jwt-verify';

export default async function handler(req, res) {
  // Validasi method
  if(req.method !== 'GET') return res.status(405).end();

  const verify = await jwtVerify(req, res);
    
  // Get Data from DB
  const data = await db('posts');
      
  // Respon Success
  res.status(200);
  // Respon JSON to Client
  res.json({
    message: 'GET Data Success',
    verify,
    data 
  });
};