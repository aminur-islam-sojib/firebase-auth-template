import { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Resister = () => {
  const [fName, setFname] = useState();
  const [lName, setLname] = useState();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "Users", userCredential.user.uid), {
        firstName: fName,
        lastName: lName,
        email: email,
        createdAt: new Date(),
      });

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <h1 className=" text-2xl font-bold text-center my-10">Register Form</h1>
        <form
          onSubmit={handleRegister}
          className=" flex flex-col justify-center items-center space-y-2.5"
        >
          <input
            onChange={(e) => setFname(e.target.value)}
            type="text"
            placeholder="First Name"
            className="input "
          />
          <input
            onChange={(e) => setLname(e.target.value)}
            type="text"
            placeholder="Last Name"
            className="input"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            className="input"
          />
          <p
            className=" text-blue-600 underline text-sm cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login ?
          </p>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent text-white px-10 mt-5"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </>
  );
};

export { Resister };
