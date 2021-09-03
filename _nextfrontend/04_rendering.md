# SSR (ServerSide Rendering)

HTML file akan digenerate mealui server ketika terjadi request dari client. Untuk menggunakan SSR kita harus menggunakan function `getServerSideProps()` secara async. Example :

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

# SSG (StaticSide Generation)

File HTML akan digenerate ketika build aplikasi (ketika menjalankan `npm run build`).

Kapan SSG digunakan? SSG direkomendasikan ketika sudah memiliki data/API yang disediakan oleh backend.

Ada 2 pilihan SSG, yaitu :

## Without Fetching Data

```jsx
  function About() {
    return <div>About</div>
  }

  export default About
```

## With Fetching Data

Terdapat 2 scenario fetch data :
1. Page content memerlukan data dari luar. Maka gunakanlah `getStaticProps`.
2. Page paths memerlukan data dari luar. Maka gunakanlah `getStaticPaths` atau `getStaticProps`.

### Scenario 1 (Content need data from API)

Example :

```jsx
  // TODO: Need to fetch `posts` (by calling some API endpoint)
  //       before this page can be pre-rendered.
  function Blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
    )
  }

  // This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://.../posts')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }

  export default Blog
```

### Scenario 2 (Path need Data from API)

Dengan memanfaatkan dynamic route, kita bisa mengirimkan data kedalam suatu page melaui url path. Misalnya anda membuat suatu file `pages/posts/[id].js` untuk menampilkan suatu post berdasarkan id.

```jsx
  // TODO: Need to fetch `posts` (by calling some API endpoint)
  //       before this page can be pre-rendered.
  function Blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
    )
  }

  // Dengan getStaticPaths
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

  // Atau bisa juga memilih menggunakan getStaticProps
  // This also gets called at build time
  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://.../posts/${params.id}`)
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post } }
  }

  export default Blog
```