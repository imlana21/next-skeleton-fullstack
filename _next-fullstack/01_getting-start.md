# Add SASS

`yarn add sass` or `npm i sass`

Configuration

```js
  // ./next.config.js
  const path = require('path')

  module.exports = {
    ...,
    sassOptions: [path.join(__dirname, 'styles')]
  }

```

# Add Airbnb style code

## Install Package

`yarn add -D babel-eslint eslint-config-airbnb eslint eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks`

## Tambahkan Script dibawah kedalam package.json

```json
  // package.json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
  }
```
# Konfigurasi .eslintrc

```json
  // .eslintrc.json
  {
    "extends": [
      "next", 
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb"
    ],
    "env" : {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "parser": "babel-eslint",
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ]
  }
```

## Tambahkan code dibawah ini kedalam package.json

```json
// package.json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb"
    ]
  },
}
```

# Add MySQL Driven

`yarn add mysql`

# Add Knexjs for query builder

Prinsip kerja knex mirip seperti php artisan pada laravel. Baca detailnya di https://knexjs.org/

## Install

`yarn add -D knex`

## Init

`yarn knex init`

## Buat file .env untuk menyimpan data yang bersifat rahasia

```
  DB_CLIENT=mysql
  DB_PORT=3306
  DB_HOST=127.0.0.1
  DB_NAME=nextfullstack
  DB_USER=root
  DB_PASS=
```

## Install plugin dotenv

Next memiliki dukungan terhadapa file environment (.env) pada runtimenya. Karena berjalan pada runtime, `.env` tidak dapat dieksekusi lewat terminal secara langsung. Oleh sebab itu, kita membutuhkan plugin `dotenv` agar `.env` dapat dieksekusi oleh knex melalui terminal.

`yarn add -D dotenv`

## Configuration knexfile.js

Karena kita hanya akan berkutat disisi development maka lakukan config :

```js
// Load dotenv plugin
const dotenv = require('dotenv');

// ./knexfile.js
module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  staging: {
    ...
  },

  production: {
    ...
  },
```

## Buat folder database pada root project

Gunanya untuk menyimpan segala hal yang berhubungan dengan database, misalnya migration, seed dan db config

## Jalankan migrate untuk membuat table

Misal : `yarn knex migrate:make create_post_table`

Perintah diatas akan membuat file dengan nama `time_create_post_table.js`

## Isi file migrate yang telah dibuat

```js
  // ./migration/time_create_post_table.js
  exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
      table.increments();
      table.string('title');
      table.text('content');
      table.timestamps();
    });
  };

  exports.down = function (knex) {
    return knex.schema.droptTable('posts');
  };
```

run perintah `yarn knex migrate:latest`