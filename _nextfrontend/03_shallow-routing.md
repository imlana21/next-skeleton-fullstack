Shallow routing memungkinkan kita untuk mengubah URL tanpa menjalankan metode pengambilan data lagi. Di Shallow Routing terdapat [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering), [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) dan [`getInitialProps`](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps).

Simplenya sih, Shallow Routing memungkinkan kita untuk menuju suatu path tanpa mengubah state yang telah ada (tanpa refresh page). Shallow Routing memanfaatkan hooks dalam implementasi statenya.

```js
  import { useEffect } from 'react'
  import { useRouter } from 'next/router'

  // Current URL is '/'
  function Page() {
    const router = useRouter()

    useEffect(() => {
      // Always do navigations after the first render
      router.push('/?counter=10', undefined, { shallow: true })
    }, [])

    useEffect(() => {
      // The counter changed!
    }, [router.query.counter])
  }

  export default Page
```