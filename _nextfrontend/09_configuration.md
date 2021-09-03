# ESLint

## Instalasi ESLint (Air BNB)

`npm i -D babel-eslint eslint-config-airbnb eslint eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks`

## Tambahkan Script dibawah kedalam package.json

```json
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

## Konfigurasi .eslintrc

```json
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
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb"
    ]
  },
}
```

## Set Linting Custom Directories (Optional)

```js
  // next.config.js
  module.exports = {
    eslint: {
      dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
  }
```

## Use Prettier (Optional)

.eslintrc

```json
  {
    "extends": ["next", "prettier"]
  }
```

# Add TypeScript

## Awal project

`npx create-next-app --ts`

or

`yarn create next-app --typescript`

## Project sudah ada

Buat file -> Ketikan pada terminal `touch tsconfig.json` maka next akan otomatis melakukan config selanjutnya

## Using TS in SSG and SSR

Singkatnya fungsi dasarnya

```js
  import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

  export const getStaticProps: GetStaticProps = async (context) => {
    // ...
  }

  export const getStaticPaths: GetStaticPaths = async () => {
    // ...
  }

  export const getServerSideProps: GetServerSideProps = async (context) => {
    // ...
  }
```

## Using TS in NEXT API

Singkatnya :

```js
  import type { NextApiRequest, NextApiResponse } from 'next'

  type Data = {
    name: string
  }

  export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({ name: 'John Doe' })
  }
```

