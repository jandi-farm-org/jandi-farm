import { signIn } from "next-auth/react";

export default function Signin() {
  return (
    <div>
      <h1>Auth Page</h1>
      <button onClick={() => signIn("google")}>Sign in with google</button>
    </div>
  );
}
