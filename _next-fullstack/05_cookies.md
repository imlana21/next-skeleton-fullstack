
Token yang didapat dari login page dapat disimpan dengan menggunakan storage ataupun cookies. Penyimpanan token harus bersifat persistance, artinya ketika halaman di refresh token akan tetap ada.

Penyimpanan token dapat dilakukan disisi client (dengan browser cookies) ataupun server (http cookies). Baca lebih lanjut mengenai cookies di https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies.

# Client Side Storage

Untuk mempermudah management cookie dari sisi client, kita akan mennggunakan package `js-cookie`. Untuk instalasi dengan perintah `yarn add js-cookie`.

Setelah instalasi sukses, kemudian kita tambahkan ke form login

```js
  // pages/auth/login.jsx
  import Cookies from "js-cookie";
import { useState } from "react";

export default function Login () {
  const [status, setStatus] = useState('normal');
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const loginHandler = async (event) => {
    // Mencegah fungsi default berfungsi
    event.preventDefault()

    setStatus('loading');

    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!loginResponse.ok) return setStatus('error ' + loginResponse.status);

    const loginJson = await loginResponse.json();

    console.log(loginJson);

    // Save token to browser cookies
    Cookies.set('token', loginJson.token)

    setStatus('success');
  }

  const fieldsHandler = (event) => {
    const nameInput = event.target.getAttribute('name');

    setFields({
      // Destructuring parameter
      ...fields,
      // Use [] to make key object dinamic
      [nameInput]: event.target.value
    })
  }

  return (
    <div>
      <h1> Login </h1>
      <form action="" onSubmit={ loginHandler.bind(this) }>
        <input onChange={ fieldsHandler.bind(this) } type="text" name="email" placeholder="Email"/>
        <br />
        <input onChange={ fieldsHandler.bind(this) } type="password" name="password" placeholder="Password"/>
        <br />
        <input type="submit" name="submit" value="Submit" />
      </form>
      <div>
        <span> Status : </span> <span> { status } </span>
      </div>
    </div>
  );
}
```

# Server Side Storage

Untuk server side Storage, NextJS telah menyediakan package `next-cookies`. Untuk instalasi `yarn add next-cookies`.

