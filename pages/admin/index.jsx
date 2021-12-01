import { ifLoginAuthorized } from "middlewares/auth/login-verify";
import router from "next/router";
import { useState } from "react";

export default function Read(props) {
  const [posts, setPosts] = useState(props.response.data);

  const deleteHandler = async (event) => {
    const confirmation = confirm('Hapus Data?');
    const id = parseInt(event.target.value);

    if(confirmation) {
      await fetch(`/api/posts/delete/${id}`, {
        headers: {
          'Authorization': `JWT ${ props.token }`,
        },
        method: 'DELETE',
      });
      
      const postsFilter = posts.filter( (post) => {
        return post.id !== id && post;
      });

      setPosts(postsFilter);

      console.log('Delete Success');
    }
  };

  const updateHandler = (event) => {
    const id = parseInt(event.target.value);

    router.push(`admin/update/${id}`);
  };

  return (
    <div>
      <h1> Get </h1>
      <div>
        <h2> Data </h2>
        <ul>
          { posts.map((data, index) => {
            return (
              <li key={ index }> 
                <div>
                  ID : { data.id }
                </div>
                <div>
                  Title : { data.title }
                </div>
                <div>
                  Content : { data.content ? data.content : 'Kosong' }
                </div>
                <div>
                  <button onClick={ deleteHandler.bind(this) } value={ data.id }> Delete </button>
                  = | =
                  <button onClick={ updateHandler.bind(this) } value={ data.id }> Update </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = await ifLoginAuthorized(context);

  const apiResponse = await fetch(`${process.env.BASE_URL}/api/posts/`, {
    headers: {
      'Authorization': `JWT ${ token }`
    }
  });

  const dataJson = await apiResponse.json();

  return {
    props: {
      response: dataJson,
      token
    }
  }
}