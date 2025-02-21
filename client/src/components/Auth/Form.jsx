import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import "../../styles/Form.css";
import { useState } from "react";
const Form = () => {

    //usestate vars
  const [isSignUp, setIsSignUp] = useState(true);
  const [SMessage, setSMessage] = useState("");
  const [LMessage, setSLogin] = useState("");
  //hooks
  const { signup, SignUpisLoading, SignUperror } = useSignup();
  const { login, LoginisLoading, Loginerror } = useLogin();
  const navigate = useNavigate()
  //form vars
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //event functions
  const handleSignUp = async (e) => {
    e.preventDefault();
    const SignupMessage = await signup(email, username, password);
    setSMessage(SignupMessage);
    setEmail("");
    setPassword("");
    setUsername("");
    navigate('/')
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const LoginMessage = await login(email, password);
    setSLogin(LoginMessage);
    setEmail("");
    setPassword("");
    navigate('/')
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
        <div className="py-2">
          <img
            className="w-[60px] h-[60px] rounded-full"
            src="https://i.pinimg.com/736x/37/6e/27/376e27c7811a79746fc3c3b8bb9aa6f1.jpg"
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
        <button className="my-2 bg-slate-800 text-white w-full py-2 rounded-md hover:cursor-pointer">
          Create an account
        </button>
        {SignUperror ||
          (Loginerror && (
            <div className="w-full">
              <p className="text-center">{SignUperror || Loginerror}</p>
            </div>
          ))}
        {SignUpisLoading ||
          (LoginisLoading && (
            <div className="w-full">
              <p className="text-center">Loading</p>
            </div>
          ))}
        {SMessage && <p>Sign up successfull</p>}

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
            src="https://i.pinimg.com/736x/37/6e/27/376e27c7811a79746fc3c3b8bb9aa6f1.jpg"
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
        <button className="my-2 bg-slate-800 text-white w-full py-2 rounded-md hover:cursor-pointer">
          Login
        </button>
        {Loginerror && (
          <div className="w-full">
            <p className="text-center">{Loginerror}</p>
          </div>
        )}
        {LoginisLoading && (
          <div className="w-full">
            <p className="text-center">Loading</p>
          </div>
        )}
        {LMessage && <p className="text-center">Login successfull</p>}

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
