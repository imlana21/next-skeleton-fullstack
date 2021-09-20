Menggunakan JWT

Jangan isi payload dengan data sensitive seperti password

# Buat schema table user

`yarn knex migrate:make create_table_user`

isi ./database/migration/xxxxx_create_table_user.js dengan code

```js
  exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('email');
      table.string('password');
      table.timestamps(true, true);
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };
```

Run `yarn knex migrate:latest` di terminal untuk memperbarui schema DB

# Install [bcrypt](https://www.npmjs.com/package/bcrypt)

Package bcrypt digunakan untuk mengenkripsi password agar lebih aman

# Register

```js
  //pages/api/auth/register.js
  import bcrypt from 'bcrypt';
  import db from '~database/db';

  export default async function handler(req, res) {
    if(req.method !== 'POST') return res.status(405).end();

    const {email, password} = req.body;
    // Password encryption
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const register = await db('users').insert({
      email,
      password: passwordHash
    })
      
    // Get user registered
    const registeredUser = await db('users').where({ id: register }).first();

    res.status(200);
    res.json({
      message: 'Registersi Success',
      data: registeredUser
    })
  }
```

# Install JSON Web Token package

`yarn add jsonwebtoken`

# Membuat Login JWT (Sign Verify)

```js
  //pages/api/auth/login.js
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
```

Coba lihat hasilnya di postman

# Menerapkan Sign Verify ke /auth/index.js

```js
  //pages/api/posts/index.js
  import db from '~database/db';
  import jwt from 'jsonwebtoken';

  export default async function handler(req, res) {
    // Validasi method
    if(req.method !== 'GET') return res.status(405).end();

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
    
    // Midlewire for verify token
    try {
      // Verify TOken
      const verify = jwt.verify(authToken, 'SecretKey');
      console.log(verify);
      
      // Get Data from DB
      const data = await db('posts');
      
      // Respon Success
      res.status(200);
      // Respon JSON to Client
      res.json({
        message: 'GET Data Success',
        data 
      })
    } catch (error) {
      res.status(401).end();
    }
  };
```

Kenapa menggunakan trycatch? Untuk memudahkan dalam Error Handling. Baca lebih lanjut https://www.npmjs.com/package/jsonwebtoken

# Pisahkan Sign Verify dengan file Index

Karena Sign Verify akan sering digunakan nantinya, maka kita perlu memisahkan proses sign verify diatas menjadi middleware tersendiri untuk mengurangi penulisan kode yang berulang.

```js
  // middlewares/auth-verify.js
  import jwt from 'jsonwebtoken';

  export default function authVerify(req, res) {
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
```

Promise digurnakan untuk membuat function menjadi asynchronous. Selain menggunakan promise, anda juga bisa menggunakan `async function nameFunct` untuk membuat fungsi + kombinasi `try {} catch (err) {}` sebagai error handling dalam async function.

Contoh Penerapan pada index.js (GET Method):

```js
  // pages/api/posts/index.js
  import db from '~database/db';
  import authVerify from 'middlewares/auth-verify';

  export default async function handler(req, res) {
    // Validasi method
    if(req.method !== 'GET') return res.status(405).end();

    const verify = await authVerify(req, res);
      
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
```