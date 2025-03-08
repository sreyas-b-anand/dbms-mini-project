import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import "../../styles/Form.css";
import { useState } from "react";
import Loader from "../utils/Loader";
import { toast } from "sonner";
import Logo from "../../assets/logo.jpg";
const Form = () => {
  //usestate vars
  const [isSignUp, setIsSignUp] = useState(true);
  //const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  //hooks
  const { signup, isLoading: signUpisLoading } = useSignup();
  const { login, isLoading: loginisLoading } = useLogin();
  const navigate = useNavigate();
  //form vars
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let jsonData;
  //event functions
  const handleSignUp = async (e) => {
    e.preventDefault();
    jsonData = await signup(email, username, password);
    console.log(jsonData);
    if (jsonData.success) {
      ////////////////////////////
      toast.success(jsonData.message);
      navigate("/dashboard");
    } else {
      setError(jsonData.message);
    }
    setEmail("");
    setPassword("");
    setUsername("");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    jsonData = await login(email, password);
    console.log(jsonData);
    if (jsonData.success) {
      ////////////////////////////////
      toast.success(jsonData.message);
      navigate("/dashboard");
    } else {
      setError(jsonData.message);
    }
    setEmail("");
    setPassword("");
  };
  if (isSignUp) {
    {
      /* Signup */
    }
    return (
      <form
        onSubmit={handleSignUp}
        className="flex flex-col items-center justify-center gap-3 px-10 py-7 rounded-lg border m-2 min-w-[344px] sm:min-w-[362px]"
      >
        <div className="py-1">
          <img
            className="w-[80px] h-[80px] rounded-full"
            src={Logo}
            alt="logo"
          />
        </div>
        <header className="text-center pb-2 flex items-center justify-center gap-2 flex-col text-wrap flex-wrap">
          <p className="font-extrabold text-3xl text-center">Welcome</p>
          <p className="text-sm text-center text-wrap ">
            Please enter your details to sign up
          </p>
        </header>

        <div className="flex items-center justify-center flex-col w-full gap-5 py-3">
          {/* Email */}
          <div className="form-group">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder=" " // Empty space required for :placeholder-shown to work
              className="w-full border rounded-md py-2 px-3"
            />
            <label className="form-label">Email</label>
          </div>

          {/* Username */}
          <div className="form-group">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder=" "
              className="w-full border rounded-md py-2 px-3"
            />
            <label className="form-label">Username</label>
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=" "
              className="w-full border rounded-md py-2 px-3"
            />
            <label className="form-label">Password</label>
          </div>
        </div>
        <button className="my-2 bg-slate-800 text-white w-full py-2 rounded-md hover:cursor-pointer flex items-center justify-center">
          {signUpisLoading ? <Loader /> : "Create an account"}
        </button>
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="py-2 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-cyan-500 cursor-pointer"
          >
            Login
          </span>
        </div>
      </form>
    );
  } else {
    {
      /* Login */
    }
    return (
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center gap-3 px-10 py-7 rounded-lg border m-2 min-w-[344px] sm:min-w-[362px]"
      >
        <div className="py-2">
          <img
            className="w-[60px] h-[60px] rounded-full"
            src={Logo}
            alt="logo"
          />
        </div>
        <header className="text-center pb-2 flex items-center justify-center gap-2 flex-col text-wrap flex-wrap">
          <p className="font-extrabold text-3xl text-center">Welcome Back</p>
          <p className="text-sm text-center text-wrap ">
            Please enter your details to login
          </p>
        </header>

        <div className="flex items-center justify-center flex-col w-full gap-5 py-3">
          {/* Email */}
          <div className="form-group">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder=" " // Empty space required for :placeholder-shown to work
              className="w-full border rounded-md py-2 px-3"
            />
            <label className="form-label">Email</label>
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=" "
              className="w-full border rounded-md py-2 px-3"
            />
            <label className="form-label">Password</label>
          </div>
        </div>
        <div className="w-full ">
          <p className="text-sm text-cyan-500 cursor-pointer ">
            Forgot password?
          </p>
        </div>
        <button className="my-2 bg-slate-800 text-white w-full py-2 rounded-md hover:cursor-pointer flex items-center justify-center">
          {loginisLoading ? <Loader /> : "Login"}
        </button>
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="py-2 text-sm">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-cyan-500 cursor-pointer"
          >
            Sign up
          </span>
        </div>
      </form>
    );
  }
};

export default Form;
