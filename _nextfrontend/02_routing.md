# Mebuat Route

## Static Path

Dengan next kita tak perlu melakukan konfigurasi routing. System routing pada next akan otomatis membaca semua file yang berada didalam folder pages, kecuali `_app.js`. Misalnya didalam folder terdapat strukture folder :

```py
  |- pages                
      |- index.js         # route => http://domain/index.js or http://domain/
      |- setting          
          |- index.js     # route => http://domain/setting or http://domain/setting/index.js
      |- admin
          |- profile.js   # route => http://domain/admin/profile.js
          |- edit.js      # route => http://domain/admin/edit.js
          |- index.js     # route => http://domain/admin/ or http://domain/admin/index.js
```

Kesimpulan :

1. Setiap folder dan file yang berada didalam **pages** akan dibaca sebagai new path pada router
2. index.js merupakan file yang akan diakses jika routing tidak menyebutkan nama page.js


## Dynamic Routing

Penggunaan static path terkadang tak dapat memenuhi kebutuhan aplikasi yang komplek. Misalnya : suatu halaman profile membutuhkan id user untuk dapat menampilkan profilenya, yang mana id user diperoleh dari pathnya. Ada beberapa cara penerapan dynamic routing, yaitu :

### Cara 1 (Catch Param with array.js)

Contoh penerapan dynamic route :

1. Buat file `pages/profile/[pid].js`

2. Masukan kode dibawah kedalam `[pid].js`
    ```js
        import { useRouter } from 'next/router'

        const Profile = () => {
            const router = useRouter()
            const { pid } = router.query

            return <p>Profile: {pid}</p>
        }

        export default Profile
    ```

`[pid]` pada path diatas dapat berisi id profile dari contoh diatas, misal : `pages/profile/1.js` atau `pages/profile/1`. Pemrosesan `[pid]` dilakukan oleh `useRouter().query`. `useRouter().query` akan memberikan nilai berupa object yang berisi nilai `pid` sebagai nama dari file.

Selain itu, program diatas juga dapat menerima parameter dari url seperti `/post/abc?foo=bar`, yang mana nantinya `useRouter()` akan memberikan array bernilai `{ "foo": "bar", "pid": "abc" }`.

### Cara 2 (Catch Param with array folder)

Berlaku untuk url dengan format `domain/path/[param1]/[param2]`

1. Buat file `pages/post/[pid]/[comment].js`
   
2. Isi `[comment].js` dengan program [Cara 1](#cara-1-catch-param-with-arrayjs)
   
3. Contoh Hasilnya `domain/post/1/Hai` yaitu `{ "pid": "1", "comment": "Hai" }`

### Cara 3 (Catch All Param with spread syntax)

1. Buat file `pages/post/[...pid].js`
   
2. Isi `[...pid].js` dengan program di [Cara 1](#cara-1-catch-param-with-arrayjs)
   
3. Contoh hasilnya dari `domain/post/1/2` yaitu `{ "pid": ["1", "2"] }`


# Penerapan Route untuk Routing

## Dari sisi server

```js
    import Link from 'next/link'

    function Home() {
        return (
            <ul>
                <li>
                    <Link href="/post/abc">
                        <a>Go to pages/post/[pid].js</a>
                    </Link>
                </li>
                <li>
                    <Link href="/post/abc?foo=bar">
                        <a>Also goes to pages/post/[pid].js</a>
                    </Link>
                </li>
                <li>
                    <Link href="/post/abc/a-comment">
                        <a>Go to pages/post/[pid]/[comment].js</a>
                    </Link>
                </li>
            </ul>
        )
    }

    export default Home
```

## Dari sisi client

Mungkin `next/link` mungkin dapat memenuhi perutean secara server side, tapi kadang kita perlu melakukan perutean disisi client.

Contohnya :

```js
    import { useRouter } from 'next/router'

    function ReadMore() {
        const router = useRouter()

        return (
            <span onClick={() => router.push('/about')}>Click here to read more</span>
        )
    }

    export default ReadMore
```