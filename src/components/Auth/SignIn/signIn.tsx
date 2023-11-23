import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./signIn.css";
import authService from "../../../services/authService";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setSuccessMessageFunc = async (message: string, delay: number) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, delay);
  };

  const setErrorMessageFunc = async (message: string, delay: number) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, delay);
  };

  const handleSignIn = async () => {
    try {
      const response = await authService.signIn({ email, password });
      authService.getToken();

      if (response.status === 201) {
        await setSuccessMessageFunc("You signed in successfully", 4000);

        navigate("/");
      } else {
        await setErrorMessageFunc("Server Error", 4000);
      }
    } catch (error: any) {
      console.error("Error signing in:", (error as Error).message);
      await setErrorMessageFunc("email or password is incorrect", 4000);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <label>Email: </label>
      <input type="email" value={email} onChange={handleEmailChange} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSignIn}>Sign In</button>
      <div className="sign-up-link">
        <p>
          If you don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
