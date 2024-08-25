import { useState, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function AuthForm() {
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  async function onSubmit(formData) {
    formData.preventDefault();

    const method = formData.target.method;
    const data = new FormData(formData.target);
    const formDataObj = Object.fromEntries(data.entries());

    const response = await fetch(isLogin ? "/api/auth/login" : "/api/auth/signup", {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.status === 422 || response.status === 401) {
      setError(await response.json());
      return;
    }

    const resData = await response.json();
    // const token = resData.token;

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    addUser({
      username: resData.username,
      isAdmin: resData.isAdmin,
      token: resData.token,
      expiration: expiration.toISOString()
    });

    navigate("/");
  }


  return (
    <div className="pt-10">
      <form method="post" onSubmit={onSubmit} className="space-y-6 bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 max-w-md mx-auto text-slate-200">
        <h3 className="font-medium text-3xl mb-5">{isLogin ? "Log in" : "Create a new user"}</h3>
        {error && (
          <ul>
            {Object.values(error.errors).map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <div>
          <label htmlFor="username" className="block text-base font-semibold text-slate-200">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-base font-semibold text-slate-200">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 pr-10 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 p-1 mt-[1.7rem] mr-1 text-slate-400 hover:text-slate-200 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">
            Submit
          </button>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 underline transition duration-200">
            {isLogin ? "Change to Sign up" : "Change to Log in"}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
