# Image Optimization

Next sangat mendukung fitur Image Optimization dengang menggunakan `next/image`. Example :

```js
import Image from 'next/image'
import profilePic from '../public/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

export default Home
```

Image src dapat berupa url langsung ataupun hasil import. Hanya saja jika menggunakan import maka *image width, height, blur, placeholder* akan otomatis terisi atau tergenerate tanpa perlu kita tambahkan hal tersebut. Jika menggunakan url langsung kita dapat bisa mengatur *image width, height, blur, placeholder* secara manual.


## Next Configuration for Image

```js
module.exports = {
  images: {
    // Darimana url asal gambar?
    domains: ['example.com'],
    // Ingin menampilkan loading ketika gambar dimuat?
    loader: 'imgix',
    // Dimana gambar berada?
    path: 'https://example.com/myaccount/',
    // Tahu resolusi perangkat dari user?
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Ingin menentukan ukuran gambar?
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Ingin menonaktifkan fitur import image dalam component?
    disableStaticImages: true,

  },
}
```
## images.loader

next menyediakan berbagai macam loader pada bundlenya, yaitu :
1. vercel (otomatis jika kita mendeploy next project di vercel)
2. imgix => `loader: 'imgix'`
3. cloudinary => `loader: 'cloudinary'`
4. akamai => `loader: 'akamai'`
5. custom => `loader: 'custom'`

## images.deviceSizes

Jika mengetahui device size dari user, kita dapat menentukan breakpoint dari image saat anda telah menerapkan `layout="responsive"` or `layout="fill"` didalam `next/image` component.

## images.imageSizes

imageSizes akan digunakan jika anda menerapkan `layout="fixed"` or `layout="intrinsic` didalam `next/image` component.


# Font Optimization

Secara default nextjs otomatis akan menambahkan inline font CSS ketika build. Tujuannya untuk mengurangi akses keluar dan meningkatkan website performance. Penulisannya :

```html
  <!-- Didalam next/head -->
  <!-- Before Build -->
  <link
    href="https://fonts.googleapis.com/css2?family=Inter"
    rel="stylesheet"
  />

  <!-- After Build -->
  <style data-href="https://fonts.googleapis.com/css2?family=Inter">
    @font-face{font-family:'Inter';font-style:normal...
  </style>
```

# Script Optimization

Biasanya kita menuliskan script didalam `next/head`

```js
  import Head from 'next/head'

  export default function Home() {
    return (
      <>
        <Head>
          <script async src="https://www.google-analytics.com/analytics.js" />
        </Head>
      </>
    )
  }
```

Untuk lebih mempersingkat bisa kita tuliskan 

```js
  import Script from 'next/script'

  export default function Home() {
    return (
      <>
        <Script src="https://www.google-analytics.com/analytics.js" />
      </>
    )
  }
```

## Loading Polyfills

```js
  <>
    <Script
      src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserverEntry%2CIntersectionObserver"
      strategy="beforeInteractive"
    />
  </>
```

## Lazy-Loading


```js
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
      />
    </>
```

## Executing Code After Loading 

```js
    <>
      <Script
        id="stripe-js"
        src="https://js.stripe.com/v3/"
        onLoad={() => {
          this.setState({ stripe: window.Stripe('pk_test_12345') })
        }}
      />
    </>
```

## Inline Scripts

```js
<Script strategy="lazyOnload">
  {`document.getElementById('banner').removeClass('hidden')`}
</Script>

// or

<Script
  dangerouslySetInnerHTML={{
    __html: `document.getElementById('banner').removeClass('hidden')`
  }}
/>
```

## Forwading Attributes

```js
    <>
      <Script
        src="https://www.google-analytics.com/analytics.js"
        id="analytics"
        nonce="XUENAJFW"
        data-test="analytics"
      />
    </>
```