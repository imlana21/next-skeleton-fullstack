import db from '~database/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  // Check user by email if available
  const checkUser = await db('users').where({ email }).first();
  if(!checkUser) return res.status(401).end();

  // Compare password from user input with password from database
  const checkPass = await bcrypt.compare(password, checkUser.password);
  if(!checkPass) return res.status(401).end();

  // Generate Token and Chaining
  // Please save using .env to save SecretKey
  const token = jwt.sign({
    id: checkUser.id,
    email: checkUser.email
  }, 'SecretKey', {
    expiresIn: '7d'
  })


  res.status(200);
  res.json({
    message: 'Login Success',
    status: checkPass,
    data: checkUser,
    token
  })
}