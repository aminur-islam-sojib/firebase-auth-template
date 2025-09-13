## 🔹 Step 1: Enable Authentication in Firebase

1. Go to **Firebase Console → Your Project → Authentication**.
2. Click **Get Started**.

3. Enable **Email/Password** authentication.

## 🔹 Step 2: Setup Firebase in Your App

Make sure Firebase is installed:

```js
npm install firebase
```

Create a `firebase.js` file:

```js
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfAIj2xzDrHNwOvxTZYl6SwZgwETTRQ1A",
  authDomain: "test-auth-c97e4.firebaseapp.com",
  projectId: "test-auth-c97e4",
  storageBucket: "test-auth-c97e4.firebasestorage.app",
  messagingSenderId: "914227266565",
  appId: "1:914227266565:web:ab830b234c6d75b93a086c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

## 🔹 Step 3: Register Form (Sign Up)

```js
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
```

## 🔹 Step 4: Login Form (Sign In)

```js
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
```

✅ Now you have:

- **Register form** → create account

- **Login form**→ login with email/password

- **Home component** → show logged-in user and logout
