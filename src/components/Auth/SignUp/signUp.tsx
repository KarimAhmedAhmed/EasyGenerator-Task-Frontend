import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import authService from "../../../services/authService";

let isAuthenticated = false;

export const setAuthenticated = (value: boolean) => {
  isAuthenticated = value;
};

export const checkAuthenticated = () => {
  return isAuthenticated;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
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

  const handleSignUp = async () => {
    try {
      // Validate the password against the specified requirements
      if (!validatePassword(password)) {
        setErrorMessageFunc("Password does not meet requirements", 4000);

        return;
      }
      const response = await authService.signUp({ email, name, password });
      authService.getToken();

      if (response.status === 201) {
        await setSuccessMessageFunc("You signed in successfully", 4000);

        navigate("/");
      } else {
        console.error(`${response.data.error}`);
        await setErrorMessageFunc(response.data.error, 4000);
      }
    } catch (error: any) {
      console.error("Error signing in:", (error as Error).message);
      await setErrorMessageFunc("email or password is incorrect", 4000);
    }
  };

  // Password validation function
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <label>Email: </label>
      <input type="email" value={email} onChange={handleEmailChange} />
      <br />
      <label>Name: </label>
      <input type="text" value={name} onChange={handleNameChange} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSignUp}>Sign Up</button>

      <div className="sign-in-link">
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/signIn")}>Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
