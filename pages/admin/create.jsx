import { ifLoginAuthorized } from "middlewares/auth/login-verify";
import router from "next/router";
import { useState } from "react";

export default function Create(props) {
  const [getInput, setInput] = useState({
    title: '',
    content: ''
  });
  const [status, setStatus] = useState('normal');

  const inputHandler = (event) => {
    const inputName = event.target.getAttribute('name');

    setInput({
      ...getInput,
      [inputName]: event.target.value
    })
  };

  const formHandler = async (event) => {
    event.preventDefault();

    setStatus('loading');

    const postResponse = await fetch(`/api/posts/create`, {
      headers: {
        'Authorization': `JWT ${ props.token }`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(getInput)
    });

    if(!postResponse.ok) return setStatus('Gagal Input');

    const postJson = await postResponse.json();

    console.log(postJson);

    setStatus('success');

    router.push('/admin');
  }
  
  return (
    <div>
      <h1> Create Post </h1>
      <form onSubmit={ formHandler.bind(this) }>
        <input type="text" name="title" id="title" placeholder="Title" onChange={ inputHandler.bind(this) } />
        <br /> <br />
        <textarea name="content" id="content" placeholder="Content" onChange={ inputHandler.bind(this) } />
        <br /> <br />
        <input type="submit" name="submit" id="submit" />
        <br /> <br />
        <div>
          Status : <span> { status } </span>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = await ifLoginAuthorized(context);
  
  return {
    props: {
      token: token
    }
  }
}