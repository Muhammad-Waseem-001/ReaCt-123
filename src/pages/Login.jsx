import { SignIn } from "@clerk/clerk-react";

const Login = () => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
    <SignIn />
  </div>
);

export default Login;