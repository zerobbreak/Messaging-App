// SignIn.jsx
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import SideImage from "../assets/side-img.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="w-full flex">
      <div className="w-1/2 flex-center flex-col gap-6 p-12 h-screen">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back, please enter your details
        </p>

        <form onSubmit={handleSubmit} className="w-full flex-col flex-center gap-6">
          <TextInput 
            label="Email" 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <TextInput 
            label="Password" 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit" className="shad-button_primary px-10 py-4 rounded-md">
            Sign in
          </button>
        </form>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Don't have an account?
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1 p-10"
          >
            Sign up
          </Link>
        </p>
      </div>
      <div className="w-1/2 h-screen">
        <img
          src={SideImage}
          alt="Side image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
