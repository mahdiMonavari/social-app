import React, { Suspense } from "react";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-116px)]">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

export default LoginPage;
