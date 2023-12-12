import { ChangeEvent, ReactNode } from "react";
import { useState, useContext } from "react";
import { MouseEvent } from "react";
import Logo1 from "../../assets/Logo.png";
import { SignUpTypes } from "./SignUp";
import { useNavigate } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { Input } from "./Input";
import { isAxiosError } from "axios";
import DataContext, { DataContextProps } from "../../context/DataContext";
import { ErrorModal } from "./ErrorModal";
import { axiosSignIn } from "../../API";

export interface LinkTypes {
  name: string;
  text: string;
  Icon: ReactNode;
}

export const SignIn = ({ setIsSignUp }: SignUpTypes) => {
  const { setUserData } = useContext(DataContext) as DataContextProps;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const fetchData = async () => {
    try {
      const { data } = await axiosSignIn(userDetails);
      const { success } = data;

      if (success) {
        const dataString = JSON.stringify(data);
        // Store the JSON string in localStorage
        localStorage.setItem("userData", dataString);
        //navigates to "/chat"
        setUserData(data);
        setTimeout(() => {
          navigate("/chat");
        }, 1000);

        setError("");
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message);
      }
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  };
  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchData();
    setUserDetails({
      ...userDetails,
      password: "",
      email: "",
    });
  };

  const inputData = [
    {
      labelText: "Email",
      type: "text",
      handleChange: handleChange,
      maxLength: 40,
      name: "email",
    },
    {
      labelText: "Password",
      type: "password",
      handleChange: handleChange,
      maxLength: 40,
      name: "password",
    },
  ];

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center flex-col">
        <form className="w-5/6 h-2/3 bg-slate-400 shadow-md rounded-lg lg:w-[500px] lg:h-[600px] flex flex-col items-center justify-center">
          <img
            src={Logo1}
            alt="logo"
            className="w-28 h-28 rounded-lg mb-2 lg:mb-4 shadow-inner"
          />
          <h1 className="mb-2 lg:mb-4">Sign in to messageMe!</h1>
          {inputData.map(
            ({ labelText, type, handleChange, maxLength, name }, i) => {
              return (
                <Input
                  key={i}
                  labelText={labelText}
                  type={type}
                  maxLength={maxLength}
                  handleChange={handleChange}
                  name={name}
                />
              );
            }
          )}
          {!error ? <div className="h-8"></div> : <ErrorModal error={error} />}
          <button
            className="w-64 h-12 rounded-lg bg-gray-700 flex items-center justify-center font-bold text-lg text-slate-200"
            type="button"
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </button>
          <div className="flex flex-row mt-3 space-x-2">
            <p>Don't have account?</p>
            <button
              onClick={() => setIsSignUp(true)}
              className="text-cyan-800 hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
        <SocialLinks />
      </div>
    </>
  );
};
