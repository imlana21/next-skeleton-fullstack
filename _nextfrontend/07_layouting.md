# Layouting 

Next mendukung React layouting. Yang mana suatu component dapat digunakan berulang kali pada setiap page.

Example :

```js
// components/layout.js

import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

Terdapat berbagai cara penggunaan dari layout diatas. Seperti :

## Single Shared Layout

Ketika anda hanya memiliki 1 layout yang akan digunakan berulang kali pada suatu aplikasi maka cara ini sangat cocok. Caranya edit _app.js seperti dibawah ini

```js
// pages/_app.js

import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

## Per Page Layouts

Jika anda menginginkan setiap page memiliki layout yang berbeda, React Component bisa menerapkan hal tersebut.

Contoh :

```js
// pages/index.js

import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'

export default function Page() {
  return {
    /** Your content */
  }
}

Page.getLayout = (page) => (
  <Layout>
    <NestedLayout>{page}</NestedLayout>
  </Layout>
)
```

```js
// pages/_app.js

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
```

# useEffect or SWR in Layout

Didalam layout, pada client side anda dapat memfetch data menggunakan useEffect atau library seperti SWR. Nahhh, kita bisa menerapkan hal tersebut kedalam Layouting juga. 

Example :

```js
// components/layout.js

import useSWR from 'swr'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  const { data, error } = useSWR('/api/navigation', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Navbar links={data.links} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```