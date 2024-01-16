import { useState } from "react";
import { SignIn } from "../components/Main/SignIn";
import { SignUp } from "../components/Main/SignUp";

export const Main = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="w-full max-w-[1920px] h-full bg-cover bg-slate-200 dark:bg-gray-950">
      {!isSignUp ? (
        <SignIn setIsSignUp={setIsSignUp} />
      ) : (
        <SignUp setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
};
