Sebelumnya kita telah membahas tentang bagaimana cara mengambil data baik secara SSR atau SSG. Nahh,, kali ini saya akan menjelaskan function yang digunakan nantinya.

# getStaticProps

Digunakan ketika :
1. Jika page memerlukan data untuk dirender ketika build aplication (sebelum request dari pengguna)
2. Ketika data masuk dari headless CMS
3. SEO (ketika page harus dirender lebih cepat)
4. Untuk data dapat di masukan ke cache public

Penulisannya :

```js
  export async function getStaticProps(context) {
     if (!data) {
      return {
        notFound: true, // Allow page to return 404
      }
    }

    return {
      props: {
        data
      },          // will be passed to the page component as props
      revalidate: 10,     // set Page re-generate (auto refresh), default nilai yaitu false
      redirect: {         // redirect page to
        destination: '/', 
        permanent: false,
      },
    }
  }
```

`context` adalah object yang berisi :
1. `params` => parameter route untuk pages yang menggunakan dynamic routes. Example : page name `[id].js`, maka paramsnya `{ id: ... }`. Sudah dibahas di [route](./02_routing.md)
2. `preview` => nilainya `true` jika page dalam preview mode atau `undefined` untuk lain preview mode.
3. `previewData` => berisi data pada mode preview.
4. `locale` => berisi active locale (if enabled).
5. `locales` => berisi semua locales yang didukung (if enabled).
6. `defaultLocale` => berisi konfigurasi default dari locale (if enabled).

Example TypeScript :

```ts
  import { InferGetStaticPropsType } from 'next'

  type Post = {
    author: string
    content: string
  }

  export const getStaticProps = async () => {
    const res = await fetch('https://.../posts')
    const posts: Post[] = await res.json()

    return {
      props: {
        posts,
      },
    }
  }

  function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    // will resolve posts to type Post[]
  }

  export default Blog
```

# getStaticPaths()

Digunakan ketika ingin membuat pages statis dengan dynamic routes yang banyak. getStaticProps menggunakan dynamic route maka ia memerlukan getStaticPaths. getStaticPaths tak dapat dikombinasikan dengan getServerSideProps.

```js
  export async function getStaticPaths() {
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } }// See the "paths" section below
      ],
      fallback: true or false // See the "fallback" section below
    };
  }
```

`getStaticPaths` akan mereturn 2 nilai, yaitu `paths` dan `fallback`

## paths

1. Ketika `getStaticPaths` diexport dalam mode async, maka ia akan menggenerate semua path berdasa params yang terdaftar.
2. Ketika page name `pages/posts/[postId]/[commentId].js`, maka paths akan bernilai `{ params: { postId: , commentId: } }`.
3. Ketika page name `pages/[...slug].js`, maka params akan berisi semua slug yang diterima. Misalnya `{ params: { postId: , commentId: } }` maka pathnya `pages/postId/commentId`

## fallback

1. Ketika nilainya false maka `getStaticPaths` akan mereturn 404 page saat path tidak ada.
2. Ketika nilainya true maka `getStaticPaths` akan mereturn 404 page saat path tidak ada, tapi nextJs akan merender halaman baru di latar belakang dengan memanfaatkan `getStaticProps` untuk meminta path dari data JSON. Ketika path belum ada, user akan balik keawal page dan next akan merendernya. Ketika path sudah ada maka user akan langsung diarahkan kesana.
3. fallback = true tidak mendukung next export
   

Contoh fallback false

```js
  // pages/posts/[id].js

  function Post({ post }) {
    // Render post...
  }

  // This function gets called at build time
  export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://.../posts')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }

  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://.../posts/${params.id}`)
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post } }
  }

  export default Post
```

Contoh fallback true

```js
  // pages/posts/[id].js
  import { useRouter } from 'next/router'

  function Post({ post }) {
    const router = useRouter()
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
      return <div>Loading...</div>
    }

    // Render post...
  }

  // This function gets called at build time
  export async function getStaticPaths() {
    return {
      // Only `/posts/1` and `/posts/2` are generated at build time
      paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
      // Enable statically generating additional pages
      // For example: `/posts/3`
      fallback: true,
    }
  }

  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://.../posts/${params.id}`)
    const post = await res.json()

    // Pass post data to the page via props
    return {
      props: { post },
      // Re-generate the post at most once per second
      // if a request comes in
      revalidate: 1,
    }
  }

  export default Post
```

Format TypeScript

```ts
  import { GetStaticPaths } from 'next'

  export const getStaticPaths: GetStaticPaths = async () => {
    // ...
  }
```


# getServerSideProps

```js
  export async function getServerSideProps(context) {
    if (!data) {
      return {
        notFound: true,
      }
    }

    return {
      props: {}, // will be passed to the page component as props
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
```

`context` berisi :
1. `params` 
2. `req` =>
3. `res` => HTTP response object
4. `query`
5. `preview`
6. `previewData`
7. `resolvedUrl`
8. `locale`
9. `locales`
10. `defaultLocale`

getServerSideProps mereturn :
1. `props`
2. `notFound`
3. `redirect`


Contoh

```js
  function Page({ data }) {
    // Render data...
  }

  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://.../data`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
  }

  export default Page
```

Contoh TypeScript:

```ts
import { InferGetServerSidePropsType } from 'next'

type Data = { ... }

export const getServerSideProps = async () => {
  const res = await fetch('https://.../data')
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve posts to type Data
}
 
export default Page
```
