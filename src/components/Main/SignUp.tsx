import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";
import { Input } from "./Input";
import { MouseEvent } from "react";
import SocialLinks from "./SocialLinks";
import axios, { isAxiosError } from "axios";

export interface SignUpTypes {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

export interface Link {
  name: string;
  text: string;
  Icon: ReactNode;
}

export interface InputProps {
  labelText: string;
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  name: string;
}

export const SignUp = ({ setIsSignUp }: SignUpTypes) => {
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    email: "",
  });

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
        "http://localhost:4000/api/user/register",
        {
          ...userDetails,
        }
      );
      const { success } = data;
      if (success) {
        setTimeout(() => {
          setIsSignUp(false);
        }, 1000);
        setError("");
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err.response?.data.message);
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    setUserDetails({
      ...userDetails,
      password: "",
      name: "",
      email: "",
    });
  };

  const inputData = [
    {
      labelText: "Name Surname",
      type: "text",
      maxLength: 40,
      name: "name",
    },
    {
      labelText: "Password",
      type: "password",
      maxLength: 40,
      name: "password",
    },

    {
      labelText: "E-mail",
      type: "email",
      maxLength: 40,
      name: "email",
    },
  ];

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <form
        onSubmit={() => handleSubmit}
        className="w-5/6 h-2/3 bg-slate-400 rounded-lg lg:w-[500px] lg:h-[600px] flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl pb-2">Welcome to messageMe!</h1>
        <h2 className="pb-2">You can sign up here!</h2>
        <div className="flex flex-col space-y-2">
          {inputData.map(({ labelText, type, maxLength, name }, i) => {
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
          })}
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="w-64 h-12 rounded-lg mt-4 bg-gray-700 flex items-center justify-center font-bold text-lg text-slate-200"
          type="button"
        >
          Sign up
        </button>
        <div className="flex flex-row pt-4">
          <p>Already have an account?</p>
          <button
            onClick={() => setIsSignUp(false)}
            className="text-cyan-800 hover:underline"
          >
            Sign in
          </button>
        </div>
      </form>
      <SocialLinks />
      {!error ? null : (
        <div className="bg-red-500 absolute top-1/2 r-1/2">{error}</div>
      )}
    </div>
  );
};
