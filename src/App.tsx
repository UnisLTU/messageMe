import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Dispatch, SetStateAction, useState } from "react";

export interface SignUpTypes {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center bg-gray-800">
      <div className="w-full max-w-[1920px] h-full bg-cover bg-[url('./src/assets/backGround.jpg')]">
        {isSignUp ? (
          <SignIn setIsSignUp={setIsSignUp} />
        ) : (
          <SignUp setIsSignUp={setIsSignUp} />
        )}
      </div>
    </div>
  );
};

export default App;
