import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className=" text-2xl font-bold text-center my-10">Login Form</h1>
      <form
        onSubmit={handleLogin}
        className=" flex flex-col justify-center items-center space-y-2.5"
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input"
        />
        <input
          onChange={(e) => setPass(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="input"
        />
        <a
          className=" text-blue-600 underline text-sm cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Resister ?
        </a>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-accent text-white px-10 mt-5"
        >
          {loading ? "Login..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export { Login };
