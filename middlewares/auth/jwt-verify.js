/*
  Function verify for access API
*/

import jwt from 'jsonwebtoken';

export default function jwtVerify(req, res) {
  return new Promise((resolve, reject) => {
    // Get Authorization Token from header
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).end();

    // Split Authorization Token berdasarkan spasi
    const authSplit = authorization.split(' ');
    const [ authType, authToken ] = [
      authSplit[0],
      authSplit[1]
    ];

    // Cek authType
    if (authType !== 'JWT') return res.status(401).end();

    // Verify TOken
    return jwt.verify(authToken, 'SecretKey', (err, decoded) => {
      if(err) return res.status(401).end();

      return resolve(decoded);
    });
  });
}