import SideImage from "../assets/side-img.svg";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(username, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-1/2 flex-center flex-col gap-6 p-12 h-screen">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use ConnectU, Please enter your details
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col flex-center gap-6">
          <TextInput
            label="Username"
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            label="Email"
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label="Password"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextInput
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}

          <Link
            className="small-regular text-primary-500 text-small-semibold ml-1"
            to="/sign-in"
          >
            Already have an account?
          </Link>
          <button className="shad-button_primary px-10 py-2 rounded-md">
            Sign Up
          </button>
        </form>
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

export default SignUp;
