import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div className="w-5/6  h-2/3 bg-slate-400 rounded-lg md:w-[500px] md:h-[600px] flex flex-col items-center justify-center">
        <TbError404 size="150" />
        <div className="p-6 text-white text-center flex flex-col items-center">
          <div className="text-xl font-extrabold">Oops! Page not found.</div>
          <div>
            The page you are looking for might not exist or have been removed,
            had it's name changed or is temporary unavailable.
          </div>
          <div>Oops! Page not found.</div>

          <button
            className="w-64 h-12 rounded-lg mt-8 bg-gray-700 flex items-center justify-center"
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
