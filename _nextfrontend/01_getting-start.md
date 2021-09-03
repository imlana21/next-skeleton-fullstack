# Instalasi 

`npx create-next-app name_project`

`npm run dev` untuk menjalankan development server

`npm run build` untuk membuild project

# Membuat Hello World

Buka file index.js dan hapus semua isinya

Kemudian tambahkan kode dibawah ini didalamnya.

```jsx
  import Head from 'next/head'

  export default function Home() {
    return (
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1> Hello World !!! </h1>
      </div>
    )
  }
```

# Struktur Folder Next

```js
  |- /project-name 
      |- pages            // Tempat halaman website (React Component) berada. Semua file js yang ada disini akan otomatis terbaca oleh next-router, kecuali file _app.js
          |- api          // Tempat untuk membuat API
          |- _app.js      // entry point. Disini tempat pemanggilan Component dan global css
          |- index.js     // Halaman utama
      |- public           // Tempat asset yang bersifat public seperti gambar dll
          |- favicon.ico
          |- vercel.svg
      |- styles           // Tempat style css berada
          |- globals.css
      |- next.config.js   // next configurasi
      |- package.json
```