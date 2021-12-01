import { ifLoginAuthorized } from "middlewares/auth/login-verify";
import router from "next/router";
import { useState } from "react";

export default function Create(props) {
  const { id, title, content } = props.data.data[0];

  const [getInput, setInput] = useState({
    title,
    content
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
    
    const update = await fetch(`/api/posts/update/${id}`, {
      headers: {
        'Authorization': `JWT ${ props.token }`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(getInput)
    });

    if(!update.ok) return setStatus('Gagal Update');

    setStatus('Success');

    router.push('/admin')
  }
  
  return (
    <div>
      <h1> Update </h1>
      <form onSubmit={ formHandler.bind(this) }>
        <input 
          type="text" 
          name="title" 
          id="title" 
          placeholder="Title" 
          onChange={ inputHandler.bind(this) } 
          value={ getInput.title } 
        />
        <br /> <br />
        <textarea 
          name="content" 
          id="content" 
          placeholder="Content" 
          onChange={ inputHandler.bind(this) } 
          value={getInput.content} 
        />
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
  const { id } = context.params;

  const response = await fetch(`${process.env.BASE_URL}/api/posts/get/${ id }`, {
    headers: {
      'Authorization': `JWT ${ token }`
    }
  });
  const dataJson = await response.json();

  return {
    props: {
      token: token,
      data: dataJson
    }
  }
}