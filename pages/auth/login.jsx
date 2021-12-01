import Cookies from "js-cookie";
import { ifLoginAuthorized, ifLoginUnauthorized } from "middlewares/auth/login-verify";
import { useState } from "react";
import Router from 'next/router'


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

    Router.push('/admin');
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

// getServerSideProps digunakan untuk melakukan data fetching pada sisi server
export async function getServerSideProps(context) {
  // Read All Cookies
  await ifLoginUnauthorized(context);

  return {
    props: {}
  }
}