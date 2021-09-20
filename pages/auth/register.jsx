import { useState } from "react";

export default function Register() {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('normal');

  const registerHandler = async (e) => {
    // Mencegah fungsi default berfungsi
    e.preventDefault();
    console.log(fields);

    setStatus('loading');

    const registerResponse = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!registerResponse.ok) return setStatus('error ' + registerResponse.status);

    const registerJson = await registerResponse.json();

    console.log(registerJson);

    setStatus('success');
  }

  const fieldsHandler = (e) => {
    const nameInput = e.target.getAttribute('name');

    setFields({
      // Destructuring parameter
      ...fields,
      // Use [] to make key object dinamic
      [nameInput]: e.target.value
    })
  }

  return (
    <div>
      <h1> Register </h1>
      <form action="" onSubmit={ registerHandler.bind(this) }>
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
  )
}