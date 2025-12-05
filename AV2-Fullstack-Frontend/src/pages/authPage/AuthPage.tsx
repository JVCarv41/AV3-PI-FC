import React from "react";
import LoginArea from "./LoginArea";
import SignUpArea from "./SignUpArea";
import "./AuthArea.css";

function AuthPage() {
  const backendUrl:string = (import.meta as any).env.VITE_BACKEND_URL;

  return (
    <div className="auth-page">
      <h1 className="auth-page-title">TS-Market</h1>
      <h2 className="auth-page-title">Your Shopping Lists, online. </h2>
      <div className="auth-container">
        <SignUpArea backendUrl={backendUrl}/>
        <LoginArea backendUrl={backendUrl} />
      </div>
    </div>
  );
}

export default AuthPage;
