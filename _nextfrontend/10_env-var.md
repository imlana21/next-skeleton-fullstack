Environment Variable berisi semua variabel yang dibutuhkan dalam konfigurasi. Environment Variable pada Next disimpan dengan nama `.env.local`. Semua variabel yang ada didalam file `.env` bersifat tertutup dan tidak dapat diakses dari luar, kecuali untuk variabel yang diawali dengan prefix `NEXT_PUBLIC_`.

Example :

```bash
  # Lokal Variabel
  HOST=localhost
  PORT=3306

  # Publica Variabel
  NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

# Pemanggilan Variable Environment dalam Project

## Local Variabel

```jsx
  // pages/index.js
  export async function getStaticProps() {
    const db = await myDB.connect({
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
    })
    // ...
  }
```

## Public Variabel

Untuk memanggil *Public Variabel* menggunakan library khusus, yaitu `setupAnalyticsService`.

```jsx
  // pages/index.js
  import setupAnalyticsService from '../lib/my-analytics-service'

  // NEXT_PUBLIC_ANALYTICS_ID can be used here as it's prefixed by NEXT_PUBLIC_
  setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

  function HomePage() {
    return <h1>Hello World</h1>
  }

  export default HomePage
```

# Default Name environment file

`.env.local` => Environment for All mode
`.env.development.local` => Development Environment
`.env.production.local` => Production Environment
`.env.test.local` => Test Environment