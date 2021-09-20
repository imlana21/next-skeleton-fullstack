# Membuat koneksi DB

```js
  // ./database/db.js
  const db = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  });

  export default db;
```

# Membuat path Alias

## Apa itu path alias?

Path alias merupakan alias dari suatu path yang digunakan untuk memperpendek jalan pemanggilan path pada suatu project. Path alias diawali dengan @, misalnya: `@component` untuk mengakses folder `src/component` dimanapun.

Semakin besar suatu project maka semakin terlihat jelas manfaat alias. Karena terkadang akan ditemui dalam project path seperti `./../../../../component/file`, semakin dalam letak file maka `../` akan semakin panjang.

Pengaturan path alias dilokasi yang sama dengan mengatur baseUrl, yaitu di `jsconfig.json` dan `tsconfig.json`. NextJS mendukung `jsconfig.json` dan `tsconfig.json` untuk versi 9.4 keatas.

## Contoh Konfigurasi

```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@components/*": ["components/*"]
      }
    }
  }
```

1. `baseUrl` : digunakan untuk mengatur base url pada javascript project
2. `paths` : tempat dimana kita membuat path alias
3. `@components/*` : adalah contoh path alias untuk mengakses seluruh file yang ada di `src/components/`

# CRUD
## Create

```js
  // pages/api/posts/create.js
  // Memanggil file ../../../database/migration/db.js menggunakan path alias
  import db from '~database/db';

  export default async function handler(req, res) {
    if( req.method !== 'POST') return res.status(405).end();

    // Get title & content from request body
    const { title, content } = req.body;
    
    // Insert/Create Data
    const create = await db('posts').insert({
      title,
      content,
    });
    
    // Get data by ID
    const createdData = await db('posts').where('id', create);

    // Set status HTTP_OK
    res.status(200);
    res.json({
      message : 'Insert Page',
      data: createdData
    });
  }
```

## Read 

```js
  // pages/api/posts/index.js
  import db from '~database/db';

  export default async function handler(req, res) {
    if(req.method !== 'GET') return res.status(405).end();

    // Knex get Data
    const data = await db('posts');

    res.status(200);
    res.json({
      message: 'GET Data Success',
      data 
    })
  };
```

## Update

```js
  // pages/api/posts/update/[id].js
  import db from '~database/db';

  export default async function handler(req, res) {
    if( req.method !== 'POST') return res.status(405).end();

    const { title, content } = req.body;

    const create = await db('posts').insert({
      title,
      content,
    });
    
    const createdData = await db('posts').where('id', create);

    res.status(200);
    res.json({
      message : 'Insert Page',
      data: createdData
    });
  }
```

## Delete

```js
  // pages/api/posts/delete/[id].js
  import db from '~database/db';

  export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

    const { id } = req.query;

    const deleteRow = await db('posts').where({ id }).del();

    res.status(200);
    res.json({
      message: 'Delete Success',
      status: deleteRow
    });
  }
```