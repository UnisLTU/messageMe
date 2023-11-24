import { ChangeEvent, ReactNode } from "react";
import { useState } from "react";
import { MouseEvent } from "react";
import Logo1 from "../../assets/Logo.png";
import { SignUpTypes } from "./SignUp";
import { useNavigate } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { Input } from "./Input";
import axios from "axios";

export interface Link {
  name: string;
  text: string;
  Icon: ReactNode;
}

export const SignIn = ({ setIsSignUp }: SignUpTypes) => {
  const navigate = useNavigate();
  const [error, setError] = useState({ isError: false, message: "" });
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleError = (errorMsg: string) => {
    setError({
      ...error,
      isError: true,
      message: errorMsg,
    });

    setTimeout(() => {
      setError({
        ...error,
        isError: false,
        message: "",
      });
    }, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...userDetails,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
        setError({
          ...error,
          isError: false,
          message: "",
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setUserDetails({
      ...userDetails,
      email: "",
      password: "",
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
        <form
          onSubmit={() => handleSubmit}
          className="w-5/6 h-2/3 bg-slate-400 shadow-md rounded-lg lg:w-[500px] lg:h-[600px] flex flex-col items-center justify-center"
        >
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
          <button
            className="w-64 h-12 rounded-lg mt-8 bg-gray-700 flex items-center justify-center font-bold text-lg text-slate-200"
            type="button"
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </button>
          <div className="flex flex-row mt-3 space-x-2">
            <p>Dont have account?</p>
            <button
              onClick={() => setIsSignUp(true)}
              className="text-cyan-800 hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
        <SocialLinks />
        {error.isError === false ? null : (
          <div className="bg-red-500 absolute top-1/2 r-1/2">
            {error.message}
          </div>
        )}
      </div>
    </>
  );
};
