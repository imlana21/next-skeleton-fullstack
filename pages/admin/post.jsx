import { ifLoginAuthorized } from "middlewares/auth/login-verify";

export default function Post() {
  return (
    <div>
      <h1> Posts </h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  await ifLoginAuthorized(context);

  return {
    props: {}
  }
}